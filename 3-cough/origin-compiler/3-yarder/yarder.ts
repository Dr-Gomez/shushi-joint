import { Token, TokenType } from "../1-lexer/lexer.ts";
import { Box, BoxType, Cargo } from "../2-compactor/compactor.ts";
import {
  Affix,
  checkIfOperator,
  getAffix,
  getArity,
  getAssociativity,
  getPrecedence,
} from "./precedence.ts";

export function yardenize(cargos: Array<Cargo>): Array<Cargo> {
  let cargoIndex = 0;
  const output: Array<Cargo> = [];
  const operators: Array<Token> = [];

  while (cargoIndex < cargos.length) {
    const cargo = cargos[cargoIndex];
    if (
      cargo.type === BoxType.ARGUMENT_SCOPE ||
      cargo.type === BoxType.CONTEXT_SCOPE ||
      cargo.type === BoxType.OPERATOR_SCOPE ||
      cargo.type === BoxType.PARAMETER_SCOPE
    ) {
      const yard = yardenize(cargo.value as Array<Box>);
      const outCargo: Box = { value: yard, type: cargo.type as BoxType };
      output.push(outCargo);
    } else if (
      cargo.type === TokenType.INT_NUM || cargo.type === TokenType.REAL_NUM ||
      cargo.type === TokenType.IDENTIFIER || cargo.type === TokenType.STRING ||
      cargo.type === TokenType.BOOL || cargo.type === BoxType.VOID_SCOPE
    ) {
      output.push(cargo);
    } else if (
      checkIfOperator(cargo as Token)
    ) {
      const operator = cargo as Token;
      const affix = getAffix(operator.value);

      if (affix === Affix.PREFIX) {
        operators.push(operator);
      } else if (affix === Affix.SUFFIX) {
        output.push(operator);
      } else {
        while (
          operators.length > 0 &&
          checkIfOperator(cargo as Token) &&
          (
            getPrecedence(operators[operators.length - 1].value) +
            getArity((cargo as Token).value))
            >=
            getPrecedence((cargo as Token).value) +
            getArity((cargo as Token).value) +
            getAssociativity((cargo as Token).value)
        ) {
          output.push(operators.pop()!);
        }

        operators.push(cargo as Token);
      }
    } else if (cargo.type === TokenType.COMMENT) {
      cargoIndex++;
      continue
    } else {
      while (operators.length > 0) {
        output.push(operators.pop()!);
      }
    }
    cargoIndex++;
  }

  while (operators.length > 0) {
    output.push(operators.pop()!);
  }

  return output;
}
