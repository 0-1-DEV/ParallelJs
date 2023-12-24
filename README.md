# ParallelJs

# Project Structure

This project is organized as follows:

- `Day 2`: Contains the abstract syntax tree (AST) module and core functionality.
  - `ast`
    - `extractors.js`
    - `main.js`
    - `finders.js`
    - `handlers.js`
    - `verifiers.js`
  - `core`
    - `helpers.js`
    - `memory.js`
  - `interpretor`
    - `helpers.js`
    - `main.js`
  - `tokeniser`
    - `cleaners.js`
    - `main.js`
- `node_modules`: Node.js modules (not expanded for brevity).
- `parser`
  - `main.js`
- `package-lock.json`: Automatically generated file for any operations where npm modifies either the `node_modules` tree, or `package.json`.
- `package.json`: Records important metadata about the project.
- `test.pjs`: A script for testing the project.

Each directory contains modules with distinct responsibilities:

- `ast`: Manipulation and query of the abstract syntax tree.
- `core`: Core utilities and helpers for the application logic.
- `interpretor`: The logic for interpreting the code.
- `tokeniser`: Responsible for breaking down the input into tokens.
- `parser`: Parses the tokens into a syntax tree or other structures.

## Getting Started

To get started with this project, clone the repository and install the dependencies:

```bash
git clone [repository-url]
cd [project-directory]
npm install
```
