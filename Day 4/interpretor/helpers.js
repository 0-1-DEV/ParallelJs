function stringSanitizeforFinalOutput(str) {
  str = str.trim();

  // Remove quotes and trim spaces
  const result = str.replace(/^['"]|['"]$/g, "").trim();

  return result;
}
export { stringSanitizeforFinalOutput };
