import { findTokenDataType, findTokenValue } from "./tokens-find.js";
import { isAllDigits } from "./utility.js";

import chalk from "chalk";
function parseVariableDeclaration(tokens, index, kind) {
  /*INPUT EXAMPLE -  ['let', 'num', '=','12',]
  /OUTPUT  - {
    nodeType: 'VariableDeclaration',
    metaData: { name: 'num', dataType: 'number', value: '12' }
  },
  */

  const variableNode = {
    nodeType: "VariableDeclaration",
    metaData: {
      name: tokens[index + 1],
      dataType: findTokenDataType(tokens, index),

      value: findTokenValue(tokens, index),
      kind: kind,
    },
  };

  return { variableNode, newindex: index + 4 };
}

//1. print(arr)
//2. ['print','(', 'arr',')',]
//3. 'print','(',  "'", 'Hello', 'from','ParallelJs', "'",')'

// Helper function to consume tokens and return a metadata object for print statements
function parsePrintStatement(index, tokens) {
  const node = {
    nodeType: "PrintStatement",
    metaData: {
      toPrint: [], // to be filled with the printed value or expression
    },
  };
  index += 2; // Move past 'print' and '(' tokens

  while (tokens[index] !== ")") {
    node.metaData.toPrint.push(tokens[index]);
    index++;
  }

  //taking care that print(1234) does not get treated as variable

  node.metaData.printType =
    node.metaData.toPrint.length === 1 && !isAllDigits(node.metaData.toPrint)
      ? "variable"
      : "literal";

  return { node, newIndex: index + 1 }; // +1 to move past the closing ')'
}

function parseFunctionExpression(tokens, index) {
  //functionName, functionBody

  console.log(chalk.blue("Parsing Function here:"));

  let functionName = tokens[index + 1];

  //we need to find function body

  let bodyStartIndex = index + 5;

  let bodyLastIndex = bodyStartIndex; //30

  //increment bodylastindex till it reaches }

  while (tokens[bodyLastIndex] !== "}") {
    bodyLastIndex++;
  }

  let bodyTokens = tokens.slice(bodyStartIndex, bodyLastIndex);

  let node = {
    nodeType: "FunctionExpression",
    metaData: {
      functionName,
      body: bodyTokens,
    },
  };

  return { node, newIndex: bodyLastIndex + 1 };
}

function parseFunctionCall(tokens, index) {
  let functionName = tokens[index];

  let node = {
    nodeType: "FunctionCall",

    metaData: {
      functionName,
      arguments: [],
    },
  };

  return { node, newIndex: index + 3 };
}
export {
  parseVariableDeclaration,
  parsePrintStatement,
  parseFunctionExpression,
  parseFunctionCall,
};
