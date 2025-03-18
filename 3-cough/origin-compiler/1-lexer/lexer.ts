import {
  isAlpha,
  isArithmeticOperator,
  isAssignmentOperator,
  isBinaryOperator,
  isBoolKeyword,
  isDigit,
  isEncapsulator,
  isIoKeyword,
  isLeftEncapsulator,
  isLogicalKeyword,
  isLogicalOperator,
  isOperator,
  isSelectionKeyword,
  isSeparator,
  isSequencingKeyword,
  isString,
  isUnaryOperator,
  isWhitespace,
} from "./detection.ts";

export enum TokenType {
  BOOL,
  INT_NUM,
  REAL_NUM,
  STRING,
  IDENTIFIER,
  LEFT_ENCAPSULATOR,
  RIGHT_ENCAPSULATOR,
  SEPARATOR,
  SELECTION_KEYWORD,
  SEQUENCING_KEYWORD,
  ASSIGNMENT_OPERATOR,
  ARITHMETIC_OPERATOR,
  BINARY_OPERATOR,
  UNARY_OPERATOR,
  LOGICAL_KEYWORD,
  LOGICAL_OPERATOR,
  IO_KEYWORD,
  ERROR,
}

export interface Token {
  value: string;
  type: TokenType;
}

interface TokenWrapper {
  token: Token;
  index: number;
}

interface TypeFunction {
  type: TokenType;
  func: Function;
}


function handleWords(input: string, index: number): TokenWrapper {
  let outToken: Token | undefined;
  
  const TypeFunctionPairs: Array<TypeFunction> = [
    { type: TokenType.BOOL, func: isBoolKeyword },
    { type: TokenType.SELECTION_KEYWORD, func: isSelectionKeyword },
    { type: TokenType.SEQUENCING_KEYWORD, func: isSequencingKeyword },
    { type: TokenType.LOGICAL_KEYWORD, func: isLogicalKeyword },
    { type: TokenType.IO_KEYWORD, func: isIoKeyword },
  ];
  
  const startIndex: number = index;
  index++;
  
  while (isAlpha(input[index])) {
    index++;
  }
  
  const word: string = input.substring(startIndex, index);
  index--;
  
  for (let typeIndex = 0; typeIndex < TypeFunctionPairs.length; typeIndex++) {
    const pair = TypeFunctionPairs[typeIndex];
    if (pair.func(word) == true) {
      outToken = { value: word, type: pair.type };
    }
  }
  
  if (outToken == undefined) {
    outToken = { value: word, type: TokenType.IDENTIFIER };
  }
  
  return { token: outToken, index: index };
}

function handleOperator(input: string, index: number): TokenWrapper {
  let outToken: Token | undefined;
  
  const TypeFunctionPairs: Array<TypeFunction> = [
    { type: TokenType.ASSIGNMENT_OPERATOR, func: isAssignmentOperator },
    { type: TokenType.ARITHMETIC_OPERATOR, func: isArithmeticOperator },
    { type: TokenType.BINARY_OPERATOR, func: isBinaryOperator },
    { type: TokenType.UNARY_OPERATOR, func: isUnaryOperator },
    { type: TokenType.LOGICAL_OPERATOR, func: isLogicalOperator },
  ];
  
  const startIndex: number = index;
  index++;
  
  while (isOperator(input[index])) {
    index++;
  }
  
  const operator: string = input.substring(startIndex, index);
  
  for (let typeIndex = 0; typeIndex < TypeFunctionPairs.length; typeIndex++) {
    const pair = TypeFunctionPairs[typeIndex];
    if (pair.func(operator) == true) {
      outToken = { value: operator, type: pair.type };
    }
  }
  
  if (outToken == undefined) {
    outToken = { value: operator, type: TokenType.ERROR };
  }
  
  return { token: outToken, index: index };
}

function handleNumbers(input: string, index: number): TokenWrapper {
  let outToken: Token | undefined;
  
  const startIndex = index;
  
  if (
    input[startIndex] == "0" && !isDigit(input[startIndex + 1]) &&
    !isWhitespace(input[startIndex + 1])
  ) {
    index += 2;
  }
  
  let type: TokenType = TokenType.INT_NUM;
  
  while (isDigit(input[index])) {
    if (input[index] == ".") {
      type = TokenType.REAL_NUM;
    }

    index++;
  }
  
  const number: string = input.substring(startIndex, index);
  index--;
  
  outToken = { value: number, type: type };
  return { token: outToken, index: index };
}

function handleStrings(input: string, index: number): TokenWrapper {
  let outToken: Token | undefined;
  
  const stringKey = input[index];
  const startIndex = index;
  index++;
  
  while (input[index] !== stringKey && index < input.length) {
    index++;
  }
  index++;
  
  const content = input.substring(startIndex, index);
  index--;
  
  if (index == input.length) {
    outToken = { value: content, type: TokenType.ERROR };
  } else {
    outToken = { value: content, type: TokenType.STRING };
  }
  
  return { token: outToken, index: index };
}

function handleEncapsulator(input: string, index: number): TokenWrapper {
  let outToken: Token | undefined;
  
  if (isLeftEncapsulator(input[index])) {
    outToken = { value: input[index], type: TokenType.LEFT_ENCAPSULATOR };
  } else {
    outToken = { value: input[index], type: TokenType.RIGHT_ENCAPSULATOR };
  }
  
  return { token: outToken, index: index };
}

function skipSpace(input: string, index: number) {
  while (isWhitespace(input[index])) {
    index++;
  }
  
  return index;
}

function handleSeparator(input: string, index: number): TokenWrapper {
  let outToken: Token | undefined;
  
  outToken = { value: input[index], type: TokenType.SEPARATOR }
  return {token: outToken, index: index}
}

function handleError(input: string, index: number): TokenWrapper {
  
  function isConstruct(char: string) {
    if (
      isDigit(char) || isAlpha(char) || isOperator(char) || isString(char) ||
      isEncapsulator(char) || isWhitespace(char)
    ) {
      return true;
    }
  
    return false;
  }
  let outToken: Token | undefined;
  
  const startIndex = index;
  index++;
  
  while (
    !isConstruct(input[index]) && index < input.length
  ) {
    index++;
  }
  
  const error = input.substring(startIndex, index);
  outToken = { value: error, type: TokenType.ERROR };
  index--;
  
  return { token: outToken, index: index };
}

export function tokenize(input: string): Array<Token> {
  const tokensOut: Array<Token> = [];
  
  let index = skipSpace(input, 0);
  let jumpToken: TokenWrapper;
  
  while (index < input.length) {
    if (isAlpha(input[index])) {
      jumpToken = handleWords(input, index);
    } else if (isOperator(input[index])) {
      jumpToken = handleOperator(input, index);
    } else if (isDigit(input[index])) {
      jumpToken = handleNumbers(input, index);
    } else if (isString(input[index])) {
      jumpToken = handleStrings(input, index);
    } else if (isEncapsulator(input[index])) {
      jumpToken = handleEncapsulator(input, index);
    } else if (isSeparator(input[index])) {
      jumpToken = handleSeparator(input, index)
    } else {
      jumpToken = handleError(input, index);
    }

    index = ++jumpToken.index;
    tokensOut.push(jumpToken.token);

    index = skipSpace(input, index);
  }

  return tokensOut;
}
