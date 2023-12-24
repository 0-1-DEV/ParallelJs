import {
  isArrayToken,
  isMethodToken,
  isNumberToken,
  isStringToken,
  isAllDigits,
} from "./verifiers.js";

import { extractArrayValue, extractStringValue } from "./extractors.js";
function findTokenDataType(tokens, index) {
  //index - 'let'

  let valuetokenStart = tokens[index + 3];

  switch (true) {
    case isNumberToken(valuetokenStart):
      return "number";

    case isStringToken(valuetokenStart):
      return "string";

    case isArrayToken(valuetokenStart):
      return "array";

    default:
      return "unknown";
  }
}

function findTokenValue(tokens, index) {
  //if its a number, ?
  //if its a string, ?

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

    default:
      // Handle unknown or other data types
      tokenValue = "undefined";
      break;
  }

  return tokenValue;
}
export { findTokenDataType, findTokenValue };
