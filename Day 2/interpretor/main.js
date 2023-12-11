import fs from "fs";
import chalk from "chalk";
import { tokenize } from "../lexer/tokenizer.js";
import { codeCleaner } from "../lexer/cleaners.js";
import { Parse } from "../parser/main.js";

function InterpretJs(sourcecode) {
  //Step 1: Read Sourcecode using node fs module

  //Step 2: Cleaning the Sourcecode
  let result = codeCleaner(sourcecode);
  console.log("result:", result);
  //Step 3: Tokenise source code

  //ideal tokens array = [let, x, =,10, const, y , = ,20]
  let tokens = tokenize(sourcecode);
  console.log(tokens);

  //Step 4: Parser(tokens) -> AST

  let AST = Parse(tokens);
}

function runFile(filePath) {
  fs.readFile(filePath, "utf8", (err, sourcecode) => {
    if (err) {
      console.error(`Error reading file: ${filePath}`);
      console.error(err);
      return;
    }

    //passing the sourcecode
    let result = InterpretJs(sourcecode);
  });
}

if (process.argv.length < 3) {
  console.log("Usage: node mainer.js <filename>");
  process.exit(1);
}

const fileName = process.argv[2];
runFile(fileName);

//functions

// Function to remove comments and unnecessary whitespaces from each line
// Tokenize the input code into an array of tokens
