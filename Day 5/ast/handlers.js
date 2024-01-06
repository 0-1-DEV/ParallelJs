import { findTokenDataType, findTokenValue } from "./tokens-find.js";
import { isAllDigits } from "./utility.js";
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

  let newindex =
    variableNode.metaData.dataType == "method" ? index + 7 : index + 4;

  return { variableNode, newindex };
}

//1. print(arr)
//2. ['print','(', 'arr',')',]
//3. 'print','(',  "'", 'Hello', 'from','ParallelJs', "'",')'

// Helper function to consume tokens and return a metadata object for print statements
function parsePrintStatement(tokens, index) {
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
  // Assuming 'function' is at the provided index
  let functionName = tokens[index + 1]; // Function name is next token after 'function'

  // Find the start of the function body (after '{')
  let bodyStartIndex = index + 5; // Skipping 'function', function name, '(', and ')'

  let bodyEndIndex = bodyStartIndex;

  //move till you dont find last bracket

  while (tokens[bodyEndIndex] !== "}") {
    bodyEndIndex++;
  }

  // Find the end of the function body (before '}')

  // Extract the tokens that represent the body of the function
  let bodyTokens = tokens.slice(bodyStartIndex, bodyEndIndex);

  let node = {
    nodeType: "FunctionExpression",
    metaData: {
      functionName: functionName,
      body: bodyTokens,
    },
  };

  // Return the node and the new index (position after the closing '}')
  return { node, newIndex: bodyEndIndex + 1 };
}
function parseFunctionCall(tokens, index) {
  // The current token is assumed to be the function name
  let functionName = tokens[index];

  // Create the AST node for the function call
  let node = {
    nodeType: "FunctionCall",
    metaData: {
      functionName: functionName,
      arguments: [], // Empty array since there are no arguments
    },
  };

  // The new index will be the current index plus 3 (functionName, '(', ')')
  let newIndex = index + 3;

  return { node, newIndex };
}

// function parseIfStatement(tokens, index) {
//   // Find the end of the condition (closing ')')
//   let endIndex = index;
//   let openBrackets = 0;
//   while (endIndex < tokens.length) {
//     if (tokens[endIndex] === "(") {
//       openBrackets++;
//     } else if (tokens[endIndex] === ")") {
//       if (openBrackets === 0) {
//         break;
//       }
//       openBrackets--;
//     }
//     endIndex++;
//   }

//   // Extract the condition tokens
//   let conditionTokens = tokens.slice(index + 2, endIndex);
//   let lhs = conditionTokens[0];
//   let operator = conditionTokens[1];
//   let rhs = conditionTokens[2];

//   // Check if rhs is a string or number
//   if (rhs.startsWith("'") && rhs.endsWith("'")) {
//     rhs = rhs.slice(1, -1); // Remove the quotes
//   } else {
//     rhs = isNaN(Number(rhs)) ? rhs : Number(rhs);
//   }

//   // Find the start and end of the 'if' block
//   let blockStartIndex = endIndex + 1; // Skip the closing ')'
//   let blockEndIndex = blockStartIndex;
//   let openCurlyBrackets = 0;
//   while (blockEndIndex < tokens.length) {
//     if (tokens[blockEndIndex] === "{") {
//       openCurlyBrackets++;
//     } else if (tokens[blockEndIndex] === "}") {
//       openCurlyBrackets--;
//       if (openCurlyBrackets === 0) {
//         break;
//       }
//     }
//     blockEndIndex++;
//   }

//   // Extract the tokens that represent the body of the 'if' statement
//   let bodyTokens = tokens.slice(blockStartIndex + 1, blockEndIndex);

//   let node = {
//     nodeType: "ConditionalStatement",
//     metaData: {
//       condition: {
//         lhs: lhs,
//         operator: operator,
//         rhs: rhs,
//       },
//     },
//     body: bodyTokens.join(" "),
//   };

//   // Return the node and the new index (position after the closing '}')
//   return { node, newIndex: blockEndIndex + 1 };
// }

export {
  parseVariableDeclaration,
  parsePrintStatement,
  parseFunctionExpression,
  parseFunctionCall,
};
