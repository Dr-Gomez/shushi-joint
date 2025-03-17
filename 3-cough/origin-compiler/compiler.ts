import { Token, tokenize } from "./1-lexer/lexer.ts";
import yardenize from "./2-yarder/yarder.ts";

function main(): void {
  const inputCode = `
      5 + (22 * 5) / 2
    `;

  let tokens: Array<Token>
  tokens = tokenize(inputCode);
  console.log(tokens)
  yardenize(tokens)
}

main();
