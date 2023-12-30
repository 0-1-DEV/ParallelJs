// Import necessary helper functions from helpers.js file

import { generateMemoryAddress } from "./helpers.js";

// Step 1: Define the MemoryImp class
class MemoryImp {
  constructor() {
    //two memories

    //1. stack memory

    this.stack = [];
    //2. heap memory

    this.heap = new Map();
  }

  // Step 2: Define the read method to read values from memory
  read(nodeName) {
    //nodename : arr, name, age

    //stack -> address -> heap(address)

    let memoryNode = this.stack.find(
      (memorynode) => memorynode.name === nodeName
    );

    if (memoryNode.value === undefined) {
      //user is trying to access it before value is assigned
      //print(a)
      //let a = 12
      let error = {};

      //var -> undefined
      //let -> 'cannot access before initialization'

      if (memoryNode.kind === "var") {
        error.value = "undefined";
      } else {
        error.value = `Reference Error: Cannot Acess ${memoryNode.kind} before initialization `;
      }

      return error;
    } else {
      return this.heap.get(memoryNode.value);
    }
  }
  // Step 3: Define write method to add/update values in memory
  write(node) {
    //variableNode.metadata = node
    //node : { name: 'num', value: '12', dataType: 'number', kind: 'let' }

    //two cases

    //1.this is a new entry -  let a = 12
    //2. the entry ( variable) is already present -  a = 13

    //check if node is already present in memory

    console.log("checking if node is already present in memory");
    let memoryNode = this.stack.find(
      (memorynode) => memorynode.name === node.name
    );

    if (memoryNode) {
      //a = undefined
      // a = 13
      // a = 14

      this._updateEntry(node, memoryNode);
    } else {
      //new entry , let a = 12
      //_createNewEntry(node)

      console.log("creating new entry");

      this._createNewEntry(node);
    }

    // Other methods can be added here as needed...
  }

  //private helper memory methods
  //1. createNewEntry
  //2. updateEntry

  _createNewEntry(node) {
    //get the node and store into stack memory

    let memoryNode = { ...node }; //node -> 0x1234 -> { name: 'num', value: '12', dataType: 'number', kind: 'let' }

    memoryNode.value = undefined;

    this.stack.push(memoryNode);

    //memrynode -> 0x1234 -> { name: 'num', value: '12', dataType: 'number', kind: 'let' }

    // memorynode.value = undefined

    // 0x1234.value = undefined
  }

  _updateEntry(node, memoryNode) {
    //store value in heap and address in stack

    let address = generateMemoryAddress();

    memoryNode.value = address;

    this.heap.set(address, node);
  }
}

const Memory = new MemoryImp();

export { Memory };
