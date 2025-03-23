import { Token, TokenType } from "../1-lexer/lexer.ts";

export enum BoxType {
  CONTEXT_SCOPE,
  ARGUMENT_SCOPE,
  PARAMETER_SCOPE,
  OPERATOR_SCOPE,
  VOID_SCOPE,
}

export type Cargo = Box | Token

export interface Box {
  value: Array<Cargo> | Cargo;
  type: BoxType;
}

interface BoxWrapper {
  box: Box;
  index: number;
}

function handleEncapsulator(tokens: Array<Token>, index: number): BoxWrapper {
  let outBox: Box;

  const innerBox = encapsulate(tokens, index + 1)
  const box = innerBox.box

  index = innerBox.index

  outBox = {value: box.value, type: box.type}
  return {box: outBox, index: index}
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
        type = BoxType.CONTEXT_SCOPE
        typeLevel = 3;
      } else if (tokens[index].value === ":" && typeLevel < 2) {
        type = BoxType.ARGUMENT_SCOPE
        typeLevel = 2;
      } else if (tokens[index].value === "," && typeLevel < 1) {
        type = BoxType.PARAMETER_SCOPE
        typeLevel = 1;
      }
    }

    if (tokens[index].type === TokenType.RIGHT_ENCAPSULATOR) {

      if(startIndex === index) {
        const box: Box = {value: boxesOut, type: BoxType.VOID_SCOPE}
        return {box: box, index: index}
      }

      const box: Box = {value: boxesOut, type: type}
      return {box: box, index: index}
    }

    if (tokens[index].type === TokenType.LEFT_ENCAPSULATOR) {
      jumpBox = handleEncapsulator(tokens, index)
    }

    if (jumpBox) {
      boxesOut.push(jumpBox.box)
      index = ++jumpBox.index
    } else {
      boxesOut.push(tokens[index])
      ++index;
    }
  }

  const box: Box = {value: boxesOut, type: BoxType.CONTEXT_SCOPE}
  return {box: box, index: index}
}

export function compact(tokens: Array<Token>): Array<Cargo> {
  let outBox: Box;

  outBox = encapsulate(tokens).box

  if (outBox.value.constructor !== Array) {
    outBox.value = [outBox.value as Cargo]
  }

  return outBox.value
}