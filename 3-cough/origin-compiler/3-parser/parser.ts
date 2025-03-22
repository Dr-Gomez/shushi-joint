import { Token, TokenType } from "../1-lexer/lexer.ts";
import { NumberBase, Node, NodeType, NodeWrapper, NumberNode, StringNode, BoolNode } from "./nodes.ts";

function handleBool(tokens: Array<Token>, index: number) {
  let outNode: BoolNode;

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

  let base: NumberBase
  let value: number;

  let startIndex = 2;
  if (tokens[index].value[1] == "b") {
    base = NumberBase.BIN
  } else if (tokens[index].value[1] == "o") {
    base = NumberBase.OCT
  } else if (tokens[index].value[1] == "x") {
    base = NumberBase.HEXA
  } else {
    startIndex = 0
    base = NumberBase.DEC
  }

  if (tokens[index].type === TokenType.INT_NUM) {
    value = parseInt(tokens[index].value.slice(startIndex))
  } else {
    value = parseFloat(tokens[index].value.slice(startIndex))
  }

  outNode = {value: value, base: base, type: NodeType.NUMBER}

  return {node: outNode, index: index}
}

function handleString(tokens: Array<Token>, index: number) {
  let outNode: StringNode;

  const value = tokens[index].value
  outNode = {value: value, type: NodeType.STRING}

  return {node: outNode, index: index}
}

function handleError(tokens: Array<Token>, index: number) {
  let outNode: Node;

  const msg = tokens[index].value + ": " + "Lingual Construct not recognized"
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
    } else if (tokens[index].type === TokenType.INT_NUM || tokens[index].type === TokenType.REAL_NUM) {
      jumpNode = handleNumber(tokens, index)
    } else if (tokens[index].type === TokenType.STRING) {
      jumpNode = handleString(tokens, index)
    } else {
      jumpNode = handleError(tokens, index)
    }

    index = ++jumpNode.index
    nodesOut.push(jumpNode.node)
  }


  return nodesOut
}