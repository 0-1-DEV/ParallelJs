import { removeQuotesFromString } from "../lexer/cleaners.js";
class PYJS_String {
  constructor(v) {
    // Store the length property directly on the object
    let arg = v.split("");
    this.length = arg.length;
    // Fill the array with 'undefined' values using a for loop
    for (let i = 0; i < arg.length; i++) {
      this[i] = arg[i];
    }
  }

  charAt(index) {
    // Mimics JavaScript's charAt method
    if (index < 0 || index >= this.value.length) {
      return "";
    }
    return this.value[index];
  }

  toUpperCase() {
    // Mimics JavaScript's toUpperCase method
    // Corrected to iterate over characters and convert each to uppercase
    let upperCaseStr = "";
    for (let i = 0; i < this.length; i++) {
      upperCaseStr += this[i].toUpperCase();
    }
    return upperCaseStr;
  }

  toLowerCase() {
    // Mimics JavaScript's toLowerCase method
    return this.value.toLowerCase();
  }
}
class PYJS_Array {
  constructor() {
    // Store the length property directly on the object
    this.length = arguments.length;
    // Fill the array with 'undefined' values using a for loop
    for (let i = 0; i < arguments.length; i++) {
      this[i] = Number(arguments[i]);
    }
  }

  push(...items) {
    // Start adding the new items at the index equal to the current length
    for (let i = 0; i < items.length; i++) {
      let cleanedIteam = removeQuotesFromString(items[i]);
      this[this.length] = cleanedIteam;

      this.length++; // Increment the length property for each new item
    }

    return Array.from(this);
  }

  pop() {
    if (this.length === 0) {
      return undefined; // Return undefined if the PYJS_Array is empty
    }
    const returnValue = this[this.length - 1]; // Get the last item
    delete this[this.length - 1]; // Delete the last item
    this.length--; // Decrement the length property
    return returnValue; // Return the popped value
  }

  map(callback) {
    const result = new PYJS_Array(); // Create a new PYJS_Array instance for the results
    for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this)); // Apply the callback and push the result
    }
    return result;
  }

  includes(item) {
    for (let i = 0; i < this.length; i++) {
      if (this[i] === item) {
        return true;
      }
    }
    return false;
  }

  // Other methods...
}

export { PYJS_String, PYJS_Array };
