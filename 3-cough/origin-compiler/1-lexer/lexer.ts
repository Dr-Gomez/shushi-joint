import {
  isAlpha,
  isArithmeticOperator,
  isAssignmentOperator,
  isBitwiseOperator,
  isBoolKeyword,
  isComment,
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
  isType,
  isUnaryOperator,
  isWhitespace,
} from "./detection.ts";
import {
  NumberBase,
  NumberToken,
  StringLevel,
  StringToken,
  Token,
  TokenType,
} from "./tokens.ts";

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
    { type: TokenType.TYPE, func: isType },
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
    { type: TokenType.BITWISE_OPERATOR, func: isBitwiseOperator },
    { type: TokenType.UNARY_OPERATOR, func: isUnaryOperator },
    { type: TokenType.LOGICAL_OPERATOR, func: isLogicalOperator },
  ];

  const startIndex: number = index;
  index++;

  while (index < input.length && isOperator(input[index])) {
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
  let startIndex = index;
  index++;

  let base: NumberBase;

  if (index < input.length && input[startIndex] == "0" && isAlpha[startIndex]) {
    switch (input[index]) {
      case "b":
        base = NumberBase.BIN;
        break;
      case "q":
        base = NumberBase.QUD;
        break;
      case "o":
        base = NumberBase.OCT;
        break;
      case "x":
        base = NumberBase.HEX;
        break;
      default:
        let outToken: Token = {
          value: "Number base not recognized",
          type: TokenType.ERROR,
        };
        return { token: outToken, index: index };
    }
    startIndex += 2;
    index++;
  } else {
    base = NumberBase.DEC;
  }

  let type: TokenType = TokenType.INT_NUM;

  while (index < input.length) {
    if (type === TokenType.INT_NUM && input[index] === ".") {
      type = TokenType.REAL_NUM;
      index++;
      continue;
    } else if (input[index] === ".") {
      let outToken: Token = {
        value: "Can't have more than one radix point per number",
        type: TokenType.ERROR,
      };
    }

    if (!isDigit(input[index])) {
      break;
    }

    index++;
  }

  const number: string = input.substring(startIndex, index);
  index--;

  let outToken: NumberToken = { value: number, base: base!, type: type };
  return { token: outToken, index: index };
}

function handleStrings(input: string, index: number): TokenWrapper {
  const stringKey = input[index];
  let level: StringLevel;
  switch (stringKey) {
    case "`":
      level = StringLevel.TEMPLATE;
      break;
    case '"':
      level = StringLevel.LITERAL;
      break;
    default:
      level = StringLevel.CHAR;
      break;
  }

  index++;
  const startIndex = index;

  while (input[index] !== stringKey && index < input.length) {
    index++;
  }

  const content = input.substring(startIndex, index);

  let outToken: Token;
  if (index == input.length) {
    outToken = { value: content, type: TokenType.ERROR };
  } else {
    outToken = {
      value: content,
      level: level,
      type: TokenType.STRING,
    } as StringToken;
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

  outToken = { value: input[index], type: TokenType.SEPARATOR };
  return { token: outToken, index: index };
}

function handleComment(input: string, index: number): TokenWrapper {
  let outToken: Token | undefined;

  if (isComment(input[index + 1]) && index < input.length) {
    index += 2;
    const startIndex = index;
    while (
      input[index] !== "\n" &&
      input[index] !== "\r" &&
      index < input.length
    ) {
      index++;
    }

    const value = input.substring(startIndex, index);

    outToken = { value: value, type: TokenType.COMMENT };
    return { token: outToken, index: index };
  } else {
    index++;
    const startIndex = index;
    while (!isComment(input[index]) && index < input.length) {
      index++;
    }

    const value = input.substring(startIndex, index);

    outToken = { value: value, type: TokenType.COMMENT };
    return { token: outToken, index: index };
  }
}

function handleError(input: string, index: number): TokenWrapper {
  function isConstruct(char: string) {
    if (
      isDigit(char) ||
      isAlpha(char) ||
      isOperator(char) ||
      isString(char) ||
      isEncapsulator(char) ||
      isWhitespace(char)
    ) {
      return true;
    }

    return false;
  }
  let outToken: Token | undefined;

  const startIndex = index;
  index++;

  while (!isConstruct(input[index]) && index < input.length) {
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
      jumpToken = handleSeparator(input, index);
    } else if (isComment(input[index])) {
      jumpToken = handleComment(input, index);
    } else {
      jumpToken = handleError(input, index);
    }

    index = ++jumpToken.index;
    tokensOut.push(jumpToken.token);

    index = skipSpace(input, index);
  }

  return tokensOut;
}
