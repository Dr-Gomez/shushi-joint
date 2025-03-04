import { isDigit } from "./detection.ts";

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
    payload: Token | null;
    index: number;
}
  
function skipWhitespace(source: string, index: number): number {
    while (/\s/.test(source[index])) {
      index++;
    }
  
    return index;
}

function handleNumber(source: string, index: number): TokenWrapper {
    if (isDigit(source[index])) {
        const startIndex = index;
        index++;

        let real: boolean = false

        while (isDigit(source[index])) {
            index++;
        }

        if (source[index] == ".") {
            real = true;
            while (isDigit(source[index])) {
                index++;
            }
        }

        const numberStr: string = source.slice(startIndex, index);
        let type: TokenType.REAL_NUM | TokenType.INT_NUM;
        
        if (real == true) {
            type = TokenType.REAL_NUM
        } else {
            type = TokenType.INT_NUM
        }

        const numberToken: Token = {type: type, value: numberStr}
        
        const wrapper: TokenWrapper = {payload: numberToken, index: index}
        return wrapper
    }

    const wrapper: TokenWrapper = {payload: null, index: index}
    return wrapper
}

const instrQueue: Array<Function> = [

]

function makeToken(source: string) {
    let instrIndex = 0
    for (instrIndex; instrIndex < instrQueue.length; instrIndex++) {

    }
} 

export function generateTokens(source: string) {
    let tokenQueue: Array<Token> = []

    let currentTokenWrapper: TokenWrapper = {
        payload: {type: TokenType.SOF, value: ""},
        index: 0,
    }

    while (currentTokenWrapper.payload?.type !== TokenType.EOF) {
        
    }
}