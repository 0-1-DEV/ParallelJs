import { findTokenDataType, findTokenValue } from "./finders.js";

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

  return printNode;
}

export { parseVariableDeclaration, parsePrintStatement };
