import { tokenize } from "./1-lexer/lexer.ts";

function main(): void {
  const inputCode = `
        number loop if 2024 2024.5 <- <~ < > <<< >>> + - / * % true and ^ & -- $$
    `;

  const tokens = tokenize(inputCode);
}

main();
