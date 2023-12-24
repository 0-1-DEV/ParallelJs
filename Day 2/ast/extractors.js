// function extractStringValue(tokens, index) {
//   const startQuote = tokens[index + 3];
//   if (startQuote === "'" || startQuote === '"') {
//     const endQuote = tokens.findIndex(
//       (token, i) => i > index + 3 && token === startQuote
//     );
//     return tokens.slice(index + 4, endQuote).join(" ");
//   }
//   return tokens[index + 3];
// }

// function extractArrayValue(tokens, index) {
//   const endBracket = tokens.findIndex((token, i) => i > index && token === "]");
//   return tokens.slice(index + 3, endBracket + 1).join(" ");
// }

// export { extractArrayValue, extractStringValue };
