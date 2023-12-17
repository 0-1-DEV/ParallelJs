import { Memory } from "../core/memory.js";
import { parseVariableDeclaration, parsePrintStatement } from "./handlers.js";

function createAst(tokens) {
  //Step 1: init AST
  let ast = []; //array of nodes

  //Step 2:iterate through tokens

  for (let i = 0; i < tokens.length; i++) {
  let token = tokens[i];

    //Step 3: Identifying the token

    //there are two type of tokens so far
    //a. Variables decl, assignement
    //b. Print keyword

    switch (token) {
      //figuring out variables in our tokens
      case "let":
      case "const":
      case "var":
        //handle Variables here

        let { variableNode, newindex } = parseVariableDeclaration(
          tokens,
          i,
          token
        );

        ast.push(variableNode);
    
        Memory.write(variableNode.metaData);

        //2nd phase: Memory will have assignments

        i = newindex - 1;
        break;

      case "bolbhai":
      case "print":
        const { node: nodePrint, newIndex: newIndexPrint } =
          parsePrintStatement(i, tokens);
        ast.push(nodePrint);
        i = newIndexPrint - 1;

        break;

      default:
        //handle unknown tokens

        break;
    }
  }

  return ast;
}

export { createAst };