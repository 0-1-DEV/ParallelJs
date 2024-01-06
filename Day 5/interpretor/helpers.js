import { PYJS_String, PYJS_Array } from "../core/primitives.js";
import { Memory } from "../core/memory.js";

//create temp object wrapper here
function CreateWrapperObjectandSolveMethodValue(node) {
  // console.log("Incoming node asking for Wrapper:", node);
  //how do we know what is the node type because n = x.toUppercase()
  //only toUppercase can signal us that its a string datatype
  /*Incoming node example
  {
    type: 'VARIABLE',
    name: 'uppername',
    dataType: 'method',
    value: 'name.toUpperCase'
  }
  */

  // let [variable, builtInMethod] = node.value.split(".");

  let { variableName, methodName, args } = extractBuiltInMethod(node.value);
  // console.log("variableName:", variableName);

  //access pure methodname
  //1. toUpperCase() Incorrect
  //2. toUpperCase Correct

  // console.log("variable:", variable);

  // let { value: variableValue } = findInMemory(memory, variable);

  let memoryNode = Memory.read(variableName);
  // console.log("memoryNode:", memoryNode);
  //based on datatype this needs to be changed, switch case for diff datatypes
  ///datatype will be found out by which method is being invoked
  let wrapperObject;

  switch (memoryNode.dataType) {
    case "string":
      wrapperObject = new PYJS_String(memoryNode.value);
      // console.log("wrapperObject:", wrapperObject);
      break;

    case "array":
      // Convert string representation of an array into a comma-separated string of its elements

      let ArrayValueAsArg = memoryNode.value
        .replace(/[\[\]]/g, "")
        .split(",")
        .map((s) => s.trim())
        .join("");

      wrapperObject = new PYJS_Array(...ArrayValueAsArg);

      // Other custom types like PYJS_Date could be handled here
      break;
    // Add cases for other types you want to handle
    default:
      throw new Error("Unsupported data type");
  }

  let result = wrapperObject[methodName](args);
  // console.log("result:", result);

  return result;
}
function stringSanitizeforFinalOutput(str) {
  str = str.trim();

  // Remove quotes and trim spaces
  const result = str.replace(/^['"]|['"]$/g, "").trim();

  return result;
}

function extractBuiltInMethod(code) {
  let parts = code.split(/\.(.+)/); // Split at the first dot
  let variableName = parts[0]; // Variable name
  let methodAndArgs = parts[1]; // Method and arguments part

  let methodParts = methodAndArgs.split("(");
  let methodName = methodParts[0]; // Method name

  // Handle case with and without arguments
  let args = methodParts[1] ? methodParts[1].replace(")", "") : "";

  return {
    variableName,
    methodName,
    args,
  };
}
export {
  stringSanitizeforFinalOutput,
  CreateWrapperObjectandSolveMethodValue,
  extractBuiltInMethod,
};
