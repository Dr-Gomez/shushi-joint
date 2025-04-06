import { Token, TokenType } from "../1-lexer/lexer.ts";

export enum Affix {
  PREFIX,
  INFIX,
  SUFFIX
}

export enum Arity {
  BINARY,
  UNARY,
}

export enum Associativity {
  NULL = 0,
  LEFT = 0,
  RIGHT = 1,
}

interface OperatorInterface {
  operator: string;
  precedence: number;
  affix: Affix;
  arity: Arity;
  associativity: Associativity;
}

let num = 0
function count() {
  num++;
  return num;
}

const precedenceDictionary: OperatorInterface[] = [
  { operator: "<->", precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.RIGHT },
  { operator: "<-",  precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.RIGHT },
  { operator: "<~>", precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.RIGHT },
  { operator: "<~",  precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.RIGHT },
  { operator: ":",   precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.RIGHT },
  { operator: "and", precedence: count(), affix: Affix.INFIX, arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "or",  precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "not", precedence: num, affix: Affix.PREFIX,    arity: Arity.UNARY,  associativity: Associativity.NULL  },
  { operator: "=",   precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "~=",   precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "!=",   precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "<",   precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: ">",   precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "+",   precedence: count(), affix: Affix.INFIX, arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "++",  precedence: num, affix: Affix.SUFFIX,    arity: Arity.UNARY,  associativity: Associativity.NULL  },
  { operator: "-",   precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "--",  precedence: num, affix: Affix.SUFFIX,    arity: Arity.UNARY,  associativity: Associativity.NULL  },
  { operator: "*",   precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "/",   precedence: num, affix: Affix.SUFFIX,    arity: Arity.UNARY,  associativity: Associativity.NULL  },
  { operator: "%",  precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "$",   precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "<<<", precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.RIGHT  },
  { operator: ">>>", precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.RIGHT  },
  { operator: "&",   precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "|",   precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "^",   precedence: num, affix: Affix.INFIX,     arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "!!",  precedence: num, affix: Affix.SUFFIX,    arity: Arity.UNARY,  associativity: Associativity.NULL  },
];

export function getPrecedence(operator: string): number {
  const op = precedenceDictionary.find((entry) => entry.operator === operator);
  return op ? op.precedence : Infinity;
}

export function getAffix(operator: string): number {
  const op = precedenceDictionary.find((entry) => entry.operator === operator)
  return op ? op.affix : Infinity
}

export function getAssociativity(operator: string): number {
  const op = precedenceDictionary.find((entry) => entry.operator === operator)
  return op ? op.associativity : Infinity
}

export function getArity(operator: string): number {
  const op = precedenceDictionary.find((entry) => entry.operator === operator)
  return op ? op.arity : Infinity
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
    case TokenType.SELECTION_KEYWORD:
      return true;
  }
  return false;
}
