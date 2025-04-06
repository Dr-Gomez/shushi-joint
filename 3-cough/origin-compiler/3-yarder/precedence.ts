import { Token, TokenType } from "../1-lexer/lexer.ts";

export enum Affix {
  PREFIX,
  INFIX,
  SUFFIX
}

export enum Arity {
  UNARY = 1,
  BINARY = 2,
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

const precedenceDictionary: OperatorInterface[] = [
  { operator: "<->", precedence: 0, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.RIGHT },
  { operator: "<-",  precedence: 0, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.RIGHT },
  { operator: "<~>", precedence: 0, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.RIGHT },
  { operator: "<~",  precedence: 0, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.RIGHT },
  { operator: ":",   precedence: 0, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.RIGHT },
  { operator: "if", precedence: 1,  affix: Affix.PREFIX, arity: Arity.BINARY, associativity: Associativity.NULL },
  { operator: "and", precedence: 2, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "or",  precedence: 2, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "=",   precedence: 3, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "<",   precedence: 3, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: ">",   precedence: 3, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "+",   precedence: 4, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "-",   precedence: 4, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "*",   precedence: 4, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "/",   precedence: 4, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "%",   precedence: 4, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "<<<", precedence: 4, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.RIGHT  },
  { operator: ">>>", precedence: 4, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.RIGHT  },
  { operator: "&",   precedence: 4, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "|",   precedence: 4, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "^",   precedence: 4, affix: Affix.INFIX,  arity: Arity.BINARY, associativity: Associativity.LEFT  },
  { operator: "++",  precedence: 5, affix: Affix.SUFFIX, arity: Arity.UNARY,  associativity: Associativity.NULL  },
  { operator: "--",  precedence: 5, affix: Affix.SUFFIX, arity: Arity.UNARY,  associativity: Associativity.NULL  },
  { operator: "~~",  precedence: 5, affix: Affix.SUFFIX, arity: Arity.UNARY,  associativity: Associativity.NULL  },
  { operator: "!!",  precedence: 5, affix: Affix.SUFFIX, arity: Arity.UNARY,  associativity: Associativity.NULL  },
  { operator: "not", precedence: 5, affix: Affix.PREFIX, arity: Arity.UNARY,  associativity: Associativity.NULL  },
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
