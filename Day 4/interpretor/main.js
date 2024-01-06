import fs from "fs";
import chalk from "chalk";

import { codeCleaner } from "../tokeniser/cleaners.js";
import { tokeniser } from "../tokeniser/main.js";
import { Parser } from "../parser/main.js";
import { logMemory } from "../core/helpers.js";
import { Memory } from "../core/memory.js";
import { stringSanitizeforFinalOutput } from "./helpers.js";

//main()
let output = [];
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

  console.log(chalk.red("Execution Phase Starts"));

  //STEP 4: Execute the code (interpret the code)

  InterpretAST(AST);
  console.log(chalk.red("Execution Phase Ends"));

  // logMemory();
}

function InterpretAST(AST) {
  //AST -> [{}, {}, {}]

  let result;

  for (let i = 0; i < AST.length; i++) {
    const currentNode = AST[i];
    const currentNodeType = currentNode.nodeType;
    const currentNodeMetadata = currentNode.metadata;

    switch (currentNodeType) {
      case "VariableDeclaration":
        console.log(chalk.yellow("VariableDeclaration Node"), currentNode);

        //write to memory, assigning it actual value

        Memory.write(currentNodeMetadata);

        break;
      case "PrintStatement":
        console.log(chalk.yellow("PrintStatement Node"), currentNode);

        //two types of print statements

        //1. print a variable
        //2. print a literal

        switch (currentNodeMetadata.printType) {
          case "variable":
            //print(arr)

            //we need to print -> what -> arr -> variable -> varible value? -> memory.read

            result = Memory.read(currentNodeMetadata.toPrint[0]);

            output.push(result.value);

            break;
          case "literal":
            let literalValue = currentNodeMetadata.toPrint.join(" ");
            console.log("literalValue:", literalValue);

            result = stringSanitizeforFinalOutput(literalValue);

            output.push(result);
            break;
          default:
            break;
        }

        break;

      case "FunctionCall":
        let functionName = currentNodeMetadata.name;

        let functionNode = Memory.read(functionName);
        console.log("functionNode from Memory:", functionNode);

        let functionBodyAST = functionNode.metadata.value;

        InterpretAST(functionBodyAST);

      // output.push(res);

      default:
        break;
    }
  }
}

function runFile(filePath) {
  fs.readFile(filePath, "utf8", (err, sourcecode) => {
    if (err) {
      console.error(`Error reading file: ${filePath}`);
      console.error(err);
      return;
    }

    InterpretJs(sourcecode);

    output.forEach((element) => {
      console.log(element);
    });
  });
}

if (process.argv.length < 3) {
  console.log("Usage: node mainer.js <filename>");
  process.exit(1);
}

const fileName = process.argv[2];
runFile(fileName);
