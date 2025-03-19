import { Token, tokenize } from "./1-lexer/lexer.ts";
import { yardenize } from "./2-yarder/yarder.ts";

function main(): void {
  const inputCode = `
    (21 / 30 = 50 * 2)!!
  `;

  let tokens: Array<Token>;
  tokens = tokenize(inputCode);
  tokens = yardenize(tokens);
  console.log(tokens);
}

main();
