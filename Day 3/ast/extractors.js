function extractStringValue(tokens, index) {
  const startQuote = tokens[index + 3];
  if (startQuote === "'" || startQuote === '"') {
    const endIndex = tokens.findIndex(
      (token, i) => i > index + 3 && token === startQuote
    );
    return tokens.slice(index + 4, endIndex).join(" ");
  }
  return tokens[index + 3];
}

function extractArrayValue(tokens, index) {
  const endIndex = tokens.findIndex((token, i) => i > index && token === "]");
  return tokens.slice(index + 3, endIndex + 1).join(" ");
}

export { extractArrayValue, extractStringValue };
