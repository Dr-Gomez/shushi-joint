import { Token, tokenize } from "./1-lexer/lexer.ts";
import { yardenize } from "./2-yarder/yarder.ts";

function main(): void {
  const inputCode = `
    hello <- 5 + (22 * 5 * boo) / 2;
    name <- "name" + 4
    `;

  let tokens: Array<Token>;
  tokens = tokenize(inputCode);
  tokens = yardenize(tokens);
  console.log(tokens);
}

main();
