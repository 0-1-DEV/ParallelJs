function tokenize(code) {
  //old regex before func
  // const regex = /(\s+|\b|["']|\(|\))/g;
  const regex = /(\s+|\b|["']|\(|\)|\){)/g;
  const tokens = splitCodeUsingRegex(code, regex); // Split the code into tokens
  const filteredTokens = filterEmptyTokens(tokens); // Remove empty tokens
  return filteredTokens;
}

//Helper functions
function splitCodeUsingRegex(code, regex) {
  return code.split(regex);
}

function filterEmptyTokens(tokens) {
  return tokens.filter((token) => token && token.trim() !== "");
}

export { tokenize };
