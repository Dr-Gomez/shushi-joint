enum NodeType {
    NUMBER,
    STRING,
    BOOL,
    IDENTIFIER,
    BINARY_OPERATOR,
    UNARY_OPERATOR,
    ERROR
}

enum NumberBase {
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
    base: NumberBase;
}


export {NodeType, NumberBase, Node, NodeWrapper, BoolNode, NumberNode}