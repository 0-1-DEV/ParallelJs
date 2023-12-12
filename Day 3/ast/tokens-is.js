function isNumberToken(token) {
  return !isNaN(parseFloat(token)) && isFinite(token);
}

function isStringToken(token) {
  return (
    typeof token === "string" &&
    (token.startsWith("'") || token.startsWith('"'))
  );
}

function isArrayToken(token) {
  return token === "[";
}

function isMethodToken(token, nextToken) {
  // Additional logic can be implemented here if needed
  return typeof token === "string" && nextToken === ".";
}

export { isArrayToken, isMethodToken, isNumberToken, isStringToken };
