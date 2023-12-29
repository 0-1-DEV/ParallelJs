function removeExtraWhitespaces(code) {
  // Replace instances of two or more whitespaces with a single space

  return code.replace(/\s{2,}/g, " ");
}

function removeNewLines(code) {
  // Replace instances of two or more whitespaces or newlines with a single space
  return code.replace(/[\n]{2,}/g, " ");
}

function removeSemicolons(code) {
  return code.replace(/;/g, " ");
}

function codeCleaner(code) {
  const codeclean1 = removeExtraWhitespaces(code);

  const codeclean2 = removeSemicolons(code);

  const codeclean3 = removeNewLines(code);

  return codeclean3;
}

export { codeCleaner };
