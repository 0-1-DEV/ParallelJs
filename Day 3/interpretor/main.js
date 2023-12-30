import fs from "fs";
import chalk from "chalk";

import { codeCleaner } from "../tokeniser/cleaners.js";
import { tokeniser } from "../tokeniser/main.js";
import { Parser } from "../parser/main.js";
import { logMemory } from "../core/helpers.js";

function InterpretJs(sourcecode) {
  console.log(chalk.red("Creation Phase Starts"));

  console.log(chalk.red("sourcecode:"), sourcecode);

  //STEP 1: Clean the code
  let cleanedCode = codeCleaner(sourcecode);
  console.log(chalk.blue("Step 1: cleanedCode:"), cleanedCode);

  //STEP 2: Tokenise the code
  //Input : let num = 12
  //Output : ["let", "num", "=", "12"]

  let tokens = tokeniser(cleanedCode);
  console.log(chalk.cyan("Step 2: tokens:"), tokens);

  //STEP 3 : Parse the code (give meaning to code, create AST out of code)

  let AST = Parser(tokens);

  console.log(chalk.green("Step 3: AST:"), AST);

  console.log(chalk.green("Creation Phase Complete"));

  logMemory();
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
