enum NodeType {
    NUMBER,
    STRING,
    BOOL,
    IDENTIFIER,
    BINARY_OPERATOR,
    UNARY_OPERATOR,
    ERROR
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

export {NodeType, Node, NodeWrapper, BoolNode}