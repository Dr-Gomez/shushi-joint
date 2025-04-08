enum TokenType {
  BOOL = 0,
  INT_NUM = 1,
  REAL_NUM = 2,
  STRING = 3,
  IDENTIFIER = 4,
  LEFT_ENCAPSULATOR = 5,
  RIGHT_ENCAPSULATOR = 6,
  SEPARATOR = 7,
  TYPE = 8,
  SELECTION_KEYWORD = 9,
  SEQUENCING_KEYWORD = 10,
  ASSIGNMENT_OPERATOR = 11,
  ARITHMETIC_OPERATOR = 12,
  BITWISE_OPERATOR = 13,
  UNARY_OPERATOR = 14,
  LOGICAL_KEYWORD = 15,
  LOGICAL_OPERATOR = 16,
  IO_KEYWORD = 17,
  ERROR = 18,
  COMMENT = 19,
  length = 20,
}

interface Token {
  value: string;
  type: TokenType;
}

enum NumberBase {
  BIN = 2,
  QUD = 4,
  OCT = 8,
  DEC = 10,
  HEX = 16,
}

interface NumberToken extends Token {
  value: string;
  type: TokenType.INT_NUM | TokenType.REAL_NUM;
  base: NumberBase;
}

enum StringLevel {
  CHAR = 0,
  LITERAL = 1,
  TEMPLATE = 2,
}

interface StringToken extends Token {
  value: string;
  type: TokenType.STRING;
  level: StringLevel;
}

export { NumberBase, NumberToken, StringLevel, StringToken, Token, TokenType };
