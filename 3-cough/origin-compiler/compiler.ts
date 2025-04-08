import { tokenize } from "./1-lexer/lexer.ts";
import { Token } from "./1-lexer/tokens.ts";
import { Cargo, compact } from "./2-compactor/compactor.ts";
import { yardenize } from "./3-yarder/yarder.ts";
import { Node } from "./4-parser/nodes.ts";
import { parse } from "./4-parser/parser.ts";

function main(): void {
  const inputCode = `
    "the big bulldog like fries"
  `;

  console.log("TOKENIZED: ");
  let tokens: Array<Token>;
  tokens = tokenize(inputCode);
  console.log(tokens);
  console.log("-".repeat(80));

  console.log("COMPACTED:");
  let cargo: Array<Cargo> = compact(tokens);
  console.log(cargo);
  console.log("-".repeat(80));

  console.log("YARDED:");
  cargo = yardenize(cargo);
  console.log(cargo);
  console.log("-".repeat(80));

  console.log("PARSED:");
  let nodes: Array<Node>;
  nodes = parse(cargo);
  console.log(nodes);
  console.log("-".repeat(80));
}

main();
