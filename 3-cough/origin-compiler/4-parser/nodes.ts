import { NumberBase } from "../1-lexer/tokens.ts";

enum NodeType {
  NUMBER,
  STRING,
  BOOL,
  IDENTIFIER,
  BINARY_OPERATOR,
  UNARY_OPERATOR,
  ERROR,
}

interface Node {
  type: NodeType;
  value: any;
}

interface NodeWrapper {
  node: Node;
  index: number;
}

interface BoolNode extends Node {
  type: NodeType.BOOL;
  value: boolean;
}

interface NumberNode extends Node {
  type: NodeType.NUMBER;
  value: number;
  base: NumberBase;
}

interface StringNode extends Node {
  type: NodeType.STRING;
  value: string;
}

interface IdentifierNode extends Node {
  type: NodeType.IDENTIFIER;
  name: string;
  value: null;
}

interface BinaryOperatorNode extends Node {
  type: NodeType.BINARY_OPERATOR;
  leftOperand: Node;
  rightOperand: Node;
  value: string;
}

export {
  BinaryOperatorNode,
  BoolNode,
  IdentifierNode,
  Node,
  NodeType,
  NodeWrapper,
  NumberBase,
  NumberNode,
  StringNode,
};
