//job of parser -> tokens -> ast

import { createAST } from "../ast/main.js";

function Parser(tokens) {
  let ast = createAST(tokens);

  return ast;
}

export { Parser };
