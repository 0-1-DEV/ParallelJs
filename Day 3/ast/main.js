import { parseVariableDeclaration, parsePrintStatement } from "./handlers.js";

import { Memory } from "../core/memory.js";

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
        let variableNode = parseVariableDeclaration(tokens, i);

        ast.push(variableNode);

        //1st phase of memory starts here:
        //we take attendence of varaibles
        //also known as hoisting (var, let and const)

        //write value to stack not heap cause this is only creation phase

        Memory.write(variableNode.metadata);

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
