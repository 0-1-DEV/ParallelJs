import {
  parseVariableDeclaration,
  parsePrintStatement,
  parseFunctionDeclaration,
  parseFunctionCall,
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

        //       //'print', '(',
        // '666',   ')',
        // 'print', '(',
        // 'arr',   ')',
        // 'print', '(',
        // 'name',  ')',
        // 'print', '(',
        // "'",     'Hello',
        // 'from',  'ParallelJs',
        // "'",     ')'

        //needs to be converted into AST

        //ARRAY OF TOKENS -> ARRAY OF NODES

        let functionBodyTokens = functionNode.metadata.value;
        // console.log("functionBody:", functionBodyTokens);

        let functionBodyAST = createAST(functionBodyTokens);
        // console.log("functionBodyAST:", functionBodyAST);

        functionNode.metadata.value = functionBodyAST;

        //tokens, nodes?

        //let a = 12
        //a -> 12

        //sayHello -> functionBodyAST

        Memory.write(functionNode);

        ast.push(functionNode);

        //the new value for index is 40
        i = newIndex - 1;

        //sayhello

        break;
      // case "if":

      // let ifNode = parseIfStatement(tokens, i);

      default:
        //sayHello, (, )

        if (tokens[i + 1] === "(" && tokens[i + 2] === ")") {
          //()

          let functionCallNode = parseFunctionCall(tokens, i);

          ast.push(functionCallNode);
        }

        break;
    }
  }

  return ast;
}

export { createAST };
