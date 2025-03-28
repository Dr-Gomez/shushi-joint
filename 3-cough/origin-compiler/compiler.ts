import { Token, tokenize } from "./1-lexer/lexer.ts";
import { Cargo, compact } from "./2-compactor/compactor.ts";
import { yardenize } from "./3-yarder/yarder.ts";
import { Node } from "./4-parser/nodes.ts";
import { parse } from "./4-parser/parser.ts";

function main(): void {
  const inputCode = `
    {
      int hello <- 4;
    }

    ()
    (num: 2)
  `;

  let tokens: Array<Token>;
  tokens = tokenize(inputCode);
  console.log(tokens);

  
  let cargo: Array<Cargo> = compact(tokens)
  console.log(cargo)

  // tokens = yardenize(tokens);
  // console.log(tokens)

  // // let nodes: Array<Node>;
  // // nodes = parse(tokens)
  // // console.log(nodes)
}

main();
