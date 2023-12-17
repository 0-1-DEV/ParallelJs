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

    let memoryNode = this.stack.find((item) => item.name === nodeName);

    if (memoryNode.value === undefined) {
      //1. the value is not presetn
      //2. the value is hoisted

      let error = {};

      //var,let,const

      error.value =
        memoryNode.kind === "var"
          ? "undefined"
          : `Reference Error: Cannot Access ${memoryNode.kind} before initialization`;

      return error;
    } else {
      return getHeapValue(memoryNode, this.heap);
    }
  }

  write(node, newval) {
    //node: { name: 'num', dataType: 'number', value: '12' }
    //multiple cases
    //1. this is a new entry
    //2. this is a update entry

    //stack : [{ name: 'num', dataType:'number', value: '12' }]
    //does this memoryNode already exist?

    let memoryNode = this.stack.find((item) => item.name === node.name);

    if (!memoryNode) {
      //method to create a new entry to memory

      this._createMemoryNode(node);
    } else {
      //method to update the value

      this._updateMemoryNode(memoryNode, node, newval);
    }
  }

  _createMemoryNode(node) {
    let memoryNode = { ...node };

    if (node.type === "function") {
      memoryNode.value = node.value;

      //stack - addresses
      //heap - values

      this._updateMemoryNode(memoryNode, node, node.value);
    }

    //this is for var, let , const
    else {
      memoryNode.value = undefined;
    }

    // mempryNode: { name: 'num', dataType:'number', value: undefined }

    this.stack.push(memoryNode);
  }

  _updateMemoryNode(memoryNode, node, newval) {
    //you actually need to assign value

    let address = generateMemoryAddress();

    memoryNode.value = address;

    node.value = newval;

    this.heap.set(address, node);
  }
}

const Memory = new MemoryImp();

export { Memory };
