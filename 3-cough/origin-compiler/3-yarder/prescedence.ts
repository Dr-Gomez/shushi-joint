import { Token, TokenType } from "../1-lexer/lexer.ts";

export enum Affix {
  PREFIX,
  INFIX,
  SUFFIX
}

interface OperatorInterface {
  operator: string;
  precedence: number;
  affix: Affix
}

const precedenceDictionary: OperatorInterface[] = [
  { operator: "<->", precedence: 0, affix: Affix.INFIX},
  { operator: "<-", precedence: 0 , affix: Affix.INFIX},
  { operator: "<~>", precedence: 0, affix: Affix.INFIX},
  { operator: "<~", precedence: 0, affix: Affix.INFIX},
  { operator: ":", precedence: 0, affix: Affix.INFIX },
  { operator: "and", precedence: 1, affix: Affix.INFIX },
  { operator: "or", precedence: 1, affix: Affix.INFIX },
  { operator: "=", precedence: 2, affix: Affix.INFIX },
  { operator: "<", precedence: 2, affix: Affix.INFIX },
  { operator: ">", precedence: 2, affix: Affix.INFIX },
  { operator: "+", precedence: 3, affix: Affix.INFIX },
  { operator: "-", precedence: 3, affix: Affix.INFIX },
  { operator: "*", precedence: 3, affix: Affix.INFIX },
  { operator: "/", precedence: 3, affix: Affix.INFIX },
  { operator: "%", precedence: 3, affix: Affix.INFIX },
  { operator: "<<<", precedence: 3, affix: Affix.INFIX },
  { operator: ">>>", precedence: 3, affix: Affix.INFIX },
  { operator: "&", precedence: 3, affix: Affix.INFIX },
  { operator: "|", precedence: 3, affix: Affix.INFIX },
  { operator: "^", precedence: 3, affix: Affix.INFIX },
  { operator: "++", precedence: 4, affix: Affix.SUFFIX },
  { operator: "--", precedence: 4, affix: Affix.SUFFIX },
  { operator: "~~", precedence: 4, affix: Affix.SUFFIX },
  { operator: "!!", precedence: 4, affix: Affix.SUFFIX },
  { operator: "not", precedence: 4, affix: Affix.PREFIX },
];

export function getPrecedence(operator: string): number {
  const op = precedenceDictionary.find((entry) => entry.operator === operator);
  return op ? op.precedence : -1;
}


export function getAffix(operator: string): number {
  const op = precedenceDictionary.find((entry) => entry.operator === operator)
  return op ? op.affix : -1
}

export function checkIfOperator(token: Token): Boolean {
  switch (token.type) {
    case TokenType.BINARY_OPERATOR:
      return true;
    case TokenType.UNARY_OPERATOR:
      return true;
    case TokenType.LOGICAL_OPERATOR:
      return true;
    case TokenType.ARITHMETIC_OPERATOR:
      return true;
    case TokenType.ASSIGNMENT_OPERATOR:
      return true;
    case TokenType.LOGICAL_KEYWORD:
      return true;
  }
  return false;
}
