const alpha: Array<string> = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "_",
];

function isAlpha(char: string) {
  return alpha.includes(char);
}

const digits: Array<string> = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
function isDigit(char: string) {
  return digits.includes(char);
}

const operators: Array<string> = [
  "+",
  "-",
  "*",
  "/",
  "%",
  "$",
  "&",
  "|",
  "^",
  ">",
  "<",
  "=",
  "!",
  "~",
];
function isOperator(char: string) {
  return operators.includes(char);
}

const whitespaces: Array<string> = [" ", "\n", "\r"];
function isWhitespace(char: string) {
  return whitespaces.includes(char);
}

const comment = "#";
function isComment(char: string) {
  return comment == char;
}

const strings: Array<string> = ["'", "`", '"'];
function isString(char: string) {
  return strings.includes(char);
}

const encapsulators: Array<string> = ["{", "}", "[", "]", "(", ")"];
function isEncapsulator(char: string) {
  return encapsulators.includes(char);
}

const leftEncapsulators: Array<string> = ["{", "[", "("];
function isLeftEncapsulator(char: string) {
  return leftEncapsulators.includes(char);
}

const separators: Array<string> = [",", ";", ":"];
function isSeparator(char: string) {
  return separators.includes(char);
}

const types: Array<string> = ["void", "bool", "int", "float", "char"];
function isType(token: string) {
  return types.includes(token);
}

const selectionKeywords: Array<string> = ["if", "else", "elif"];
function isSelectionKeyword(token: string) {
  return selectionKeywords.includes(token);
}

const sequencingKeywords: Array<string> = ["gateway", "warp"];
function isSequencingKeyword(token: string) {
  return sequencingKeywords.includes(token);
}

const assignmentOperators: Array<string> = ["<-", "<~", "<->", "<~>"];
function isAssignmentOperator(token: string) {
  return assignmentOperators.includes(token);
}

const arithmeticOperators: Array<string> = ["+", "-", "*", "/", "%", "$"];
function isArithmeticOperator(token: string) {
  return arithmeticOperators.includes(token);
}

const bitwiseOperators: Array<string> = ["&", "|", "^", "<<<", ">>>", "><"];
function isBitwiseOperator(token: string) {
  return bitwiseOperators.includes(token);
}

const unaryOperators: Array<string> = ["!!", "++", "--"];
function isUnaryOperator(token: string) {
  return unaryOperators.includes(token);
}

const logicalKeywords: Array<string> = ["and", "or", "not"];
function isLogicalKeyword(token: string) {
  return logicalKeywords.includes(token);
}

const logicalOperators: Array<string> = ["=", "!=", "~=", "<=", ">=", "<", ">"];
function isLogicalOperator(token: string) {
  return logicalOperators.includes(token);
}

const boolKeywords: Array<string> = ["true", "false"];
function isBoolKeyword(token: string) {
  return boolKeywords.includes(token);
}

const ioKeywords: Array<string> = ["print", "input"];
function isIoKeyword(token: string) {
  return ioKeywords.includes(token);
}

export {
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
};
