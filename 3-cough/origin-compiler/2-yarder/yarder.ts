import { Token, TokenType } from "../1-lexer/lexer.ts";
import { checkIfOperator, getPrecedence } from "./prescedence.ts";

export function yardTokens(tokens: Token[]) {
  let tokenIndex = 0;
  const output: Array<Token> = [];
  const operators: Array<Token> = [];
  let startIndex = tokenIndex;

  while (tokenIndex < tokens.length) {
    const token = tokens[tokenIndex];
    console.log(`Processing token: ${JSON.stringify(token)}`);

    if (
      token.type === TokenType.INT_NUM || token.type === TokenType.REAL_NUM ||
      token.type === TokenType.IDENTIFIER || token.type === TokenType.STRING
    ) {
      startIndex = tokenIndex;
      output.push(token);
    } else if (
      checkIfOperator(token)
    ) {
      while (
        operators.length > 0 &&
        (checkIfOperator(token)) &&
        getPrecedence(operators[operators.length - 1].value) >=
          getPrecedence(token.value)
      ) {
        output.push(operators.pop()!);
      }
      operators.push(token);
    } else if (
      token.type === TokenType.LEFT_ENCAPSULATOR && token.value === "("
    ) {
      operators.push(token);
    } else if (
      token.type === TokenType.RIGHT_ENCAPSULATOR && token.value === ")"
    ) {
      while (
        operators.length > 0 &&
        operators[operators.length - 1].type !== TokenType.LEFT_ENCAPSULATOR
      ) {
        output.push(operators.pop()!);
      }
      if (operators.length === 0) {
        console.error("MISMATCHED PARENTHESES");
      } else {
        operators.pop();
      }
    } else {
      while (operators.length > 0) {
        const op = operators.pop()!;
        if (
          op.type === TokenType.LEFT_ENCAPSULATOR ||
          op.type === TokenType.RIGHT_ENCAPSULATOR
        ) {
          console.error("MISMATCHED PARENTHESES");
        }
        output.push(op);
      }

      output.push(token);
    }

    tokenIndex++;
  }

  while (operators.length > 0) {
    const op = operators.pop()!;
    if (
      (op.type === TokenType.LEFT_ENCAPSULATOR && op.value === ")") ||
      (op.type === TokenType.RIGHT_ENCAPSULATOR && op.value === ")")
    ) {
      console.error("MISMATCHED PARENTHESES");
    }
    output.push(op);
  }

  return output;
}

export default function yardenize(tokens: Token[]): void {
  console.log(yardTokens(tokens));
}
