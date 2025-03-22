enum NodeType {
    NUMBER,
    STRING,
    BOOL,
    IDENTIFIER,
    BINARY_OPERATOR,
    UNARY_OPERATOR,
    ERROR
}

enum Base {
    BIN,
    OCT,
    DEC,
    HEXA
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
    base: Base;
}


export {NodeType, Base, Node, NodeWrapper, BoolNode, NumberNode}