import { isAlpha, isArithmeticOperator, isAssignmentOperator, isBinaryOperator, isBoolKeyword, isDigit, isIoKeyword, isLogicalKeyword, isLogicalOperator, isSelectionKeyword, isSequencingKeyword, isUnaryOperator } from "./detection";

interface Token {
    value: string;
    type: string;
}

function tokenize(input: string): Array<Token> {
    const tokensIn: Array<string> = input.split(/\s+/);
    const tokensOut: Array<Token> = [];

    for (const token of tokensIn) {
        let tokenType = "";
        
        if (isAlpha(token[0])) {
            tokenType = "ALPHA"
        } else if (isDigit(token[0])) {
            tokenType = "NUMBER"
        } else if (isSelectionKeyword(token)) {
            tokenType = "SELECTION_KEYWORD"
        } else if (isSequencingKeyword(token)) {
            tokenType = "SEQUENCING_KEYWORD"
        } else if (isAssignmentOperator(token)) {
            tokenType = "ASSIGNMENT_OPERATOR"
        } else if (isArithmeticOperator(token)) {
            tokenType = "ARITHMETIC_OPERATOR"
        } else if (isBinaryOperator(token)) {
            tokenType = "BINARY_OPERATOR"
        } else if (isUnaryOperator(token)) {
            tokenType = "UNARY_OPERATOR"
        } else if (isLogicalKeyword(token)) {
            tokenType = "LOGICAL_KEYWORD"
        } else if (isLogicalOperator(token)) {
            tokenType = "LOGICAL_OPERATOR"
        } else if (isBoolKeyword(token)) {
            tokenType = "BOOL_KEYWORD"
        } else if (isIoKeyword(token)) {
            tokenType = "IO_KEYWORD"
        } else {
            tokenType = "ERROR"
        }
        
        tokensOut.push({type: tokenType, value: token})
    }

    return tokensOut
}