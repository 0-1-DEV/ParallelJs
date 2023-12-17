function isAllDigits(inputString) {
  // Use a regular expression to check if the string contains only digits
  return /^\d+$/.test(inputString);
}

export { isAllDigits };
