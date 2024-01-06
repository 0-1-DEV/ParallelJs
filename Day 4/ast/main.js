import {
  parseVariableDeclaration,
  parsePrintStatement,
  parseFunctionDeclaration,
} from "./handlers.js";

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

        break;
      //what should our next case be?

      case "function":
        //we entered at i = 20
        console.log("function parsing starts for :");

        let { node: functionNode, newIndex } = parseFunctionDeclaration(
          tokens,
          i
        );
        console.log("functionNode:", functionNode);

        ast.push(functionNode);

        //the new value for index is 40
        i = newIndex;

        break;
      // case "if":

      // let ifNode = parseIfStatement(tokens, i);

      default:
        break;
    }
  }

  return ast;
}

export { createAST };
