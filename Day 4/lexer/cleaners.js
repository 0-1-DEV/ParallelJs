function removeQuotesFromString(str) {
  // Regular expression to remove single or double quotes from the start and end of a string
  const quoteRegex = /^['"]+|['"]+$/g;
  return str.replace(quoteRegex, "");
}

function removeExtraWhitespaces(code) {
  // Replace instances of two or more whitespaces with a single space

  return code.replace(/\s{2,}/g, " ");
}

function removeSemicolons(code) {
  return code.replace(/;/g, " ");
}

function codeCleaner(code) {
  const codeclean1 = removeExtraWhitespaces(code);

  const codeclean2 = removeSemicolons(code);

  return codeclean2;
}

export { codeCleaner, removeQuotesFromString };
