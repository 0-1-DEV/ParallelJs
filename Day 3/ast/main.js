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

        console.log("Variable found", token);

        let { variableNode, newindex } = parseVariableDeclaration(
          tokens,
          i,
          token
        );

        ast.push(variableNode);
        // ast.unshift(declarationNode);

        //store this variables in memory
        //1st phase: Memory will have only declarations
        //2nd phase: Memory will have assignments

        //we need to implement memory

        //stack memory and heap memory

        i = newindex;
        break;

      case "print":
        const { node: nodePrint, newIndex: newIndexPrint } =
          parsePrintStatement(i, tokens);
        ast.push(nodePrint);
        console.log("nodePrint:", nodePrint);
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
