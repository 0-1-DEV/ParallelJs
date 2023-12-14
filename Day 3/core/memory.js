// Import necessary helper functions from helpers.js file
import { getHeapValue, generateMemoryAddress } from "./helpers.js";

// Step 1: Define the MemoryImp class
class MemoryImp {
  // Constructor to initialize the memory with stack and heap

  constructor() {
    this.stack = []; //for addresses

    this.heap = new Map(); //for values
  }

  // Step 2: Define the read method to read values from memory
  read(nodeName) {
    //3 cases of memorynode
  }

  write(node, newval, scope) {
    console.log("Incoming var node: Phase 1:", node);
  }
}

const Memory = new MemoryImp();

export { Memory };
