import { Token, TokenType } from "../1-lexer/lexer";
import { Node, NodeType, NodeWrapper, NumberNode } from "./nodes";

function handleBool(tokens: Array<Token>, index: number) {
  let outNode: Node;

  let value: boolean;
  if (tokens[index].value == "true") {
    value = true; 
  } else {
    value = false;
  }

  outNode = {value: value, type: NodeType.BOOL}
  
  return {node: outNode, index: index}
}

function handleNumber(tokens: Array<Token>, index: number) {
  let outNode: NumberNode;
  
  let base: "bin" | "oct" | "dec" | "hexa"
  let value: number;

  let startIndex = 2;
  if (tokens[index][1].value == "b") {
    base = "bin"
  } else if (tokens[index][1].value == "o") {
    base = "oct"
  } else if (tokens[index][1].value == "x") {
    base = "hexa"
  } else {
    startIndex = 0
    base = "dec"
  }

  if (TokenType.INT_NUM) {
    value = parseInt(tokens[index].value.slice(startIndex))
  } else {
    value = parseFloat(tokens[index].value.slice(startIndex))
  }

  outNode = {value: value, base: base, type: NodeType.NUMBER}

  return {node: outNode, index: index}
}

function handleError(tokens: Array<Token>, index: number) {
  let outNode: Node;

  const msg = "Lingual Construct not recognized"
  outNode = {value: msg, type: NodeType.ERROR}
  
  return {node: outNode, index: index}
}

export function parse(tokens: Array<Token>) {
  const nodesOut: Array<Node> = [];

  let jumpNode: NodeWrapper;
  let index = 0;
  while (index < tokens.length) {
    if (tokens[index].type === TokenType.BOOL) {      
      jumpNode = handleBool(tokens, index)
    } if (tokens[index].type === TokenType.INT_NUM || TokenType.REAL_NUM) {
      jumpNode = handleNumber(tokens, index)
    } else {
      jumpNode = handleError(tokens, index)
    }

    index = ++jumpNode.index
    nodesOut.push(jumpNode.node)
  }
}