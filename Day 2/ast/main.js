import { parseVariableDeclaration, parsePrintStatement } from "./handlers.js";

function createAST(tokens) {
  let ast = []; //array of objects

  //Input -> ['let', 'num',   '=', '12'], 'print', '(','666',   ')',
  /*Output -> {

    kind:'let',
    name: 'num',
    datatype:'string',
    value: 12

  }
  */

  for (let i = 0; i < tokens.length; i++) {
    //if token is let , ?
    //if token is print, ?

    let token = tokens[i];

    switch (token) {
      //parseVariabledeclaration
      case "var":
      case "let":
      case "const":
        let { variableNode, endIndex } = parseVariableDeclaration(tokens, i);

        ast.push(variableNode);
        // i = endIndex;
        break;

      case "print":
        let printNode = parsePrintStatement(tokens, i);
        ast.push(printNode);

      default:
        break;
    }
  }

  return ast;
}

export { createAST };
