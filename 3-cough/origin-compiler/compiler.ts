import { Token, tokenize } from "./1-lexer/lexer.ts";
import { yardenize } from "./2-yarder/yarder.ts";
import { Node } from "./3-parser/nodes.ts";
import { parse } from "./3-parser/parser.ts";

function main(): void {
  const inputCode = `
    22.5 225 0b33
  `;

  let tokens: Array<Token>;
  tokens = tokenize(inputCode);
  tokens = yardenize(tokens);
  console.log(tokens)
  
  let nodes: Array<Node>;
  nodes = parse(tokens)
  console.log(nodes)
}

main();
