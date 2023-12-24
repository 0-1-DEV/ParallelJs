import fs from "fs";
import chalk from "chalk";

import { codeCleaner } from "../tokeniser/cleaners.js";

function InterpretJs(sourcecode) {
  console.log("sourcecode:", sourcecode);

  //STEP 1: Clean the code
  let cleanedCode = codeCleaner(sourcecode);
  console.log("cleanedCode:", cleanedCode);
}

function runFile(filePath) {
  fs.readFile(filePath, "utf8", (err, sourcecode) => {
    if (err) {
      console.error(`Error reading file: ${filePath}`);
      console.error(err);
      return;
    }

    let result = InterpretJs(sourcecode);
  });
}

if (process.argv.length < 3) {
  console.log("Usage: node mainer.js <filename>");
  process.exit(1);
}

const fileName = process.argv[2];
runFile(fileName);
