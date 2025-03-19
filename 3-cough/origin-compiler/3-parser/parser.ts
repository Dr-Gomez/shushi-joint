import { Token, TokenType } from "../1-lexer/lexer";
import { Node, NodeType, NodeWrapper } from "./nodes";

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
    } else {
      jumpNode = handleError(tokens, index)
    }

    index = ++jumpNode.index
    nodesOut.push(jumpNode.node)
  }
}