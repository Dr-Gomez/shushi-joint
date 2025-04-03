import { Token, TokenType } from "../1-lexer/lexer.ts";
import { Box, BoxType, Cargo } from "../2-compactor/compactor.ts";
import { checkIfOperator, getPrecedence } from "./prescedence.ts";

export function yardenize(cargos: Array<Cargo>): Array<Cargo> {
  let cargoIndex = 0;
  const output: Array<Cargo> = [];
  const operators: Array<Token> = [];

  while (cargoIndex < cargos.length) {
    if (
      cargos[cargoIndex].type === BoxType.ARGUMENT_SCOPE || cargos[cargoIndex].type === BoxType.CONTEXT_SCOPE || 
      cargos[cargoIndex].type === BoxType.OPERATOR_SCOPE || cargos[cargoIndex].type === BoxType.PARAMETER_SCOPE
    ) {
      const yard = yardenize(cargos[cargoIndex].value as Array<Box>)
      const cargo: Box = {value: yard, type: cargos[cargoIndex].type as BoxType}
      output.push(cargo)
    } else if (
      cargos[cargoIndex].type === TokenType.INT_NUM || cargos[cargoIndex].type === TokenType.REAL_NUM ||
      cargos[cargoIndex].type === TokenType.IDENTIFIER || cargos[cargoIndex].type ===  TokenType.STRING ||
      cargos[cargoIndex].type === BoxType.VOID_SCOPE
    ) {
      output.push(cargos[cargoIndex])
    } else if (
      checkIfOperator(cargos[cargoIndex] as Token)
    ) {
      while (
        operators.length > 0 &&
        checkIfOperator(cargos[cargoIndex] as Token) &&
        (getPrecedence(operators[operators.length - 1].value) >= getPrecedence((cargos[cargoIndex] as Token).value))
      ) {
        output.push(operators.pop()!)
      }
      
      operators.push(cargos[cargoIndex] as Token)
    } else {
      while (operators.length > 0) {
        output.push(operators.pop()!)
      } 
    }
    cargoIndex++
  }

  while (operators.length > 0) {
    output.push(operators.pop()!)
  } 

  return output
}