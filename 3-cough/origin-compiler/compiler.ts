import { Token, tokenize } from "./1-lexer/lexer.ts";
import { Cargo, compact } from "./2-compactor/compactor.ts";
import { yardenize } from "./3-yarder/yarder.ts";
import { Node } from "./4-parser/nodes.ts";
import { parse } from "./4-parser/parser.ts";

function main(): void {
  const inputCode = `
    (2 * 5) / 2
  `;

  let tokens: Array<Token>;
  tokens = tokenize(inputCode);

  
  let cargo: Array<Cargo> = compact(tokens)
  console.log(cargo)


  // // let nodes: Array<Node>;
  // // nodes = parse(tokens)
  // // console.log(nodes)
}

main();
