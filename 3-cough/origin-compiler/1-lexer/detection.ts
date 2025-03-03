const selectionKeywords: Array<string> = ["if", "else", "elif"];
function isSelectionKeyword (token: string) {
    return selectionKeywords.includes(token)
}

const sequencingKeywords: Array<string> = ["count", "loop" ,"rift", "warp"]
function isSequencingKeyword (token: string) {
    return sequencingKeywords.includes(token)
}

const assignmentOperators: Array<string> = ["<-", "<~", "<->", "<~>"];
function isAssignmentOperator (token: string) {
    return assignmentOperators.includes(token)
}

const arithmeticOperators: Array<string> = ["+", "-", "*", "/", "%"];
function isArithmeticOperator (token: string) {
    return arithmeticOperators.includes(token)
}

const binaryOperators: Array<string> = ["&", "|", "^", "<<<", ">>>", "><"];
function isBinaryOperator (token: string) {
    return binaryOperators.includes(token)
}

const unaryOperators: Array<string> = ["!!", "$$", "++", "--"];
function isUnaryOperator (token: string) {
    return unaryOperators.includes(token)
}

const logicalKeywords: Array<string> = ["and", "or", "not"]
function isLogicalKeyword (token: string) {
    return logicalKeywords.includes(token)
}

const logicalOperators: Array<string> = ["=", "!=", "~=", ">=", "<=", "<", ">"]
function isLogicalOperator (token: string) {
    return logicalOperators.includes(token)
}

const boolKeywords: Array<string> = ["true", "false"]
function isBoolKeyword (token: string) {
    return boolKeywords.includes(token)
}

const ioKeywords: Array<string> = ["print", "input"]
function isIoKeyword (token: string) {
    return ioKeywords.includes(token)
}

export {isSelectionKeyword, isSequencingKeyword, isAssignmentOperator, isArithmeticOperator, isBinaryOperator, isUnaryOperator, isLogicalKeyword, isLogicalOperator, isBoolKeyword, isIoKeyword}