import { Token, TokenType } from "../1-lexer/lexer.ts";

export enum BoxType {
  CONTEXT_SCOPE = TokenType.length,
  ARGUMENT_SCOPE = TokenType.length + 1,
  PARAMETER_SCOPE = TokenType.length + 2,
  OPERATOR_SCOPE = TokenType.length + 3,
  VOID_SCOPE = TokenType.length + 4,
}

export type Cargo = Box | Token;

export interface Box {
  value: Array<Cargo>;
  type: BoxType;
}

interface BoxWrapper {
  box: Box;
  index: number;
}

function handleEncapsulator(tokens: Array<Token>, index: number): BoxWrapper {
  let outBox: Box;

  const innerBox = encapsulate(tokens, index + 1);
  const box = innerBox.box;

  outBox = { value: box.value, type: box.type };
  return { box: outBox, index: innerBox.index };
}

function encapsulate(tokens: Array<Token>, index?: number): BoxWrapper {
  const boxesOut: Array<Cargo> = [];

  if (!index) {
    index = 0;
  }

  const startIndex = index;

  let type: BoxType = BoxType.OPERATOR_SCOPE;
  let typeLevel: number = 0;

  let jumpBox: BoxWrapper | null = null;

  while (index < tokens.length) {
    if (tokens[index].type === TokenType.SEPARATOR) {
      if (tokens[index].value === ";" && typeLevel < 3) {
        type = BoxType.CONTEXT_SCOPE;
        typeLevel = 3;
      } else if (tokens[index].value === "," && typeLevel < 2) {
        type = BoxType.PARAMETER_SCOPE;
        typeLevel = 2;
      } else if (tokens[index].value === ":" && typeLevel < 1) {
        type = BoxType.ARGUMENT_SCOPE;
        typeLevel = 1;
      }
    }

    if (tokens[index].type === TokenType.RIGHT_ENCAPSULATOR) {
      if (startIndex === index) {
        const box: Box = { value: boxesOut, type: BoxType.VOID_SCOPE };
        return { box: box, index: index };
      }

      const box: Box = { value: boxesOut, type: type };
      return { box: box, index: index };
    }

    if (tokens[index].type === TokenType.LEFT_ENCAPSULATOR) {
      jumpBox = handleEncapsulator(tokens, index);
    }

    if (jumpBox) {
      boxesOut.push(jumpBox.box);
      index = jumpBox.index + 1;
      jumpBox = null;
    } else {
      boxesOut.push(tokens[index]);
      ++index;
    }
  }

  const box: Box = { value: boxesOut, type: BoxType.CONTEXT_SCOPE };
  return { box: box, index: index };
}

export function compact(tokens: Array<Token>): Array<Cargo> {
  let outBox: Box;

  outBox = encapsulate(tokens).box;

  return outBox.value;
}
