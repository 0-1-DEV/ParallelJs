import {
  isArrayToken,
  isMethodToken,
  isNumberToken,
  isStringToken,
} from "./tokens-is.js";

function findTokenDataType(tokens, index, memory) {
  //Dual token approach
  let token = tokens[index + 3];
  let nextToken = tokens[index + 4];
  switch (true) {
    case isNumberToken(token):
      return "number";

    case isStringToken(token):
      return "string";

    case isArrayToken(token):
      return "array";

    case isMethodToken(token, nextToken):
      return "method";

    default:
      return "unknown";
  }
}

function findTokenValue(tokens, index) {
  //a token is encountered from a keyword, mostly variable
  const dataType = findTokenDataType(tokens, index);
  //whatever comes after =
  let tokenValue;

  switch (dataType) {
    case "number":
      tokenValue = tokens[index + 3];
      break;
    case "string":
      return extractStringValue(tokens, index);

      break;
    case "array":
      // Find the closing bracket
      return extractArrayValue(tokens, index);

      break;
    case "method":
      tokenValue = handleMethodTokens(tokens, index + 3);

      break;
    default:
      // Handle unknown or other data types
      tokenValue = "undefined";
      break;
  }

  return tokenValue;
}

function handleMethodTokens(tokens, index) {
  let joinedValue = "";
  let parenthesisCount = 0;

  while (true) {
    let token = tokens[index];
    joinedValue += token;

    index++;
    if (tokens[index - 1] === ")") {
      break;
    }
  }

  return joinedValue;
}
function extractStringValue(tokens, index) {
  const startQuote = tokens[index + 3];
  if (startQuote === "'" || startQuote === '"') {
    const endQuote = tokens.findIndex(
      (token, i) => i > index + 3 && token === startQuote
    );
    return tokens.slice(index + 4, endQuote).join(" ");
  }
  return tokens[index + 3];
}

function extractArrayValue(tokens, index) {
  const endBracket = tokens.findIndex((token, i) => i > index && token === "]");
  return tokens.slice(index + 3, endBracket + 1).join(" ");
}

export { findTokenDataType, findTokenValue };
