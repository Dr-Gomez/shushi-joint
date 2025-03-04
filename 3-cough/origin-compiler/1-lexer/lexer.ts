export enum TokenType {
    SOF,
    EOF,
    IDENTIFIER,
    TYPE,
    INT_NUM,
    REAL_NUM,
    STRING,
    BOOL,
    KEYWORD,
    ASSIGN_OPERATOR,
    BIN_OPERATOR,
    UNA_OPERATOR,
    PUNCTUATOR,
    TERMINATOR,
    LEFT_ENCAPSULATOR,
    RIGHT_ENCAPSULATOR,
    COMMENT,
    ERROR
}

export interface Token {
    type: TokenType;
    value: string;
}

export interface TokenWrapper {
    payload: Token;
    index: number;
}
  
function skipWhitespace(source: string, index: number): number {
    while (/\s/.test(source[index])) {
      index++;
    }
  
    return index;
}

const instrQueue: Array<Function> = [

]

export function handleTokens(source: string) {
    let tokenQueue: Array<Token> = []

    let currentTokenWrapper: TokenWrapper = {
        payload: {type: TokenType.SOF, value: ""},
        index: 0,
    }

    while (currentTokenWrapper.payload.type !== TokenType.EOF) {
    }
}