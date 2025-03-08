import { tokenize } from "./1-lexer/lexer.ts";

function main(): void {
    const inputCode = `
        number <- "hello"
        add <- 2`

    const tokens = tokenize(inputCode)
    console.log(tokens)

}

main();