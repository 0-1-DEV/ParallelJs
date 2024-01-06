import { Memory } from "../core/memory.js";
import {
  parseVariableDeclaration,
  parsePrintStatement,
  parseFunctionExpression,
  parseFunctionCall,
} from "./handlers.js";

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

      case "print":
      case "banana":
        const { node: nodePrint, newIndex: newIndexPrint } =
          parsePrintStatement(tokens, i);
        ast.push(nodePrint);
        i = newIndexPrint - 1;

        break;

      case "function":
        const { node, newIndex: newindexFunction } = parseFunctionExpression(
          tokens,
          i
        );

        let functionBodyNode = createAst(node.metaData.body);

        let functionNode = {
          name: node.metaData.functionName,
          value: functionBodyNode,
          type: "function",
        };
        // console.log("functionNode:", functionNode);

        Memory.write(functionNode);

        node.functionBodyNode = functionBodyNode;
        ast.push(node);

        i = newindexFunction - 1;

        // case "if":
        //   const { node: nodeIf, newIndex: newIndexIf } = parseIfStatement(
        //     tokens,
        //     i
        //   );

        //   ast.push(nodeIf);
        //   console.log("nodeIf:", nodeIf);

        //   i = newIndexIf;

        //   console.log("tokens:", tokens);
        //   break;
        break;

      default:
        //handle unknown tokens

        // Check for a function call pattern: functionName followed by '()'
        if (
          i + 2 < tokens.length &&
          tokens[i + 1] === "(" &&
          tokens[i + 2] === ")"
        ) {
          const { node, newIndex: newindexFunctionCall } = parseFunctionCall(
            tokens,
            i
          );

          ast.push(node);

          i = newindexFunctionCall - 1;
        }

        break;
    }
  }

  return ast;
}

export { createAst };
