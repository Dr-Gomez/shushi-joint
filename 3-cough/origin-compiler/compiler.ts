import { split } from "./0-splitter/splitter.ts";
import { tokenize } from "./1-lexer/lexer.ts";

function main(): void {
    const inputCode = `
        number <- "hello"
        add <- 2`

    const splits = split(inputCode)
    console.log(splits)
    const tokens = tokenize(splits)
    console.log(tokens)

}

main();