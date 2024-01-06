import { findTokenDataType, findTokenValue } from "./finders.js";

import { isAllDigits } from "./verifiers.js";
function parseVariableDeclaration(tokens, index) {
  //

  let tokenValue = findTokenValue(tokens, index);
  console.log("tokenValue:", tokenValue);

  const variableNode = {
    nodeType: "VariableDeclaration",

    metadata: {
      name: tokens[index + 1],
      value: tokenValue,
      dataType: findTokenDataType(tokens, index),
      kind: tokens[index],
    },
  };

  return variableNode;
}

function parsePrintStatement(tokens, index) {
  let printNode = {
    nodeType: "PrintStatement",

    metadata: {
      toPrint: [],
    },
  };

  index = index + 2;
  while (tokens[index] !== ")") {
    printNode.metadata.toPrint.push(tokens[index]);

    index++;
  }

  //figuring out the datatype of the print statement

  printNode.metadata.printType =
    printNode.metadata.toPrint.length === 1 &&
    !isAllDigits(printNode.metadata.toPrint)
      ? "variable"
      : "literal";

  return printNode;
}

function parseFunctionDeclaration(tokens, index) {
  let functionName = tokens[index + 1];

  //find the function body

  let bodystartIndex = index + 5;

  let bodyendIndex = bodystartIndex; //25

  while (tokens[bodyendIndex] !== "}") {
    bodyendIndex++;
  }

  let bodyTokens = tokens.slice(bodystartIndex, bodyendIndex);

  let node = {
    nodeType: "FunctionDeclaration",

    metadata: {
      name: functionName,
      value: bodyTokens,
    },
  };

  return { node, newIndex: bodyendIndex + 1 };
}

function parseFunctionCall(tokens, index) {
  let node = {
    nodeType: "FunctionCall",

    metadata: {
      functionName: tokens[index],
    },
  };

  return node;
}

export {
  parseVariableDeclaration,
  parsePrintStatement,
  parseFunctionDeclaration,
  parseFunctionCall,
};
