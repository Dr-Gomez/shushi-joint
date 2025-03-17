import { Token, TokenType } from "../1-lexer/lexer.ts";

interface OperatorInterface {
    operator: string;
    precedence: number;
}

const precedenceDictionary: OperatorInterface[] = [
    {operator: "<->", precedence: 0},
    {operator: "<-",  precedence: 0},
    {operator: "and", precedence: 1},
    {operator: "or",  precedence: 1},
    {operator: "not", precedence: 1},
    {operator: "=",   precedence: 2},
    {operator: "<",   precedence: 2},
    {operator: ">",   precedence: 2},
    {operator: "+",   precedence: 3},
    {operator: "-",   precedence: 3},
    {operator: "*",   precedence: 3},
    {operator: "/",   precedence: 3},
    {operator: "%",   precedence: 3},
    {operator: "<<<", precedence: 3},
    {operator: ">>>", precedence: 3},
    {operator: "&",   precedence: 3},
    {operator: "|",   precedence: 3},
    {operator: "^",   precedence: 3},
    {operator: "++",  precedence: 4},
    {operator: "--",  precedence: 4},
    {operator: "~~",  precedence: 4},
    {operator: "!!",  precedence: 4},
];

export function getPrecedence(operator: string): number {
    const op = precedenceDictionary.find((entry) => entry.operator === operator);
    return op ? op.precedence : -1;
}

export function checkIfOperator (token: Token): Boolean {
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
    return false
}