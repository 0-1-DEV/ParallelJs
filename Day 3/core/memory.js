// Import necessary helper functions from helpers.js file
import {
  isUninitialized,
  getHeapValue,
  isPrimitive,
  generateMemoryAddress,
} from "./helpers.js";

// Step 1: Define the MemoryImp class
class MemoryImp {
  // Constructor to initialize the memory with stack and heap
  constructor() {
    this.stack = []; // Stack array to hold simple memory items like variables
    this.heap = new Map(); // Heap map to manage more complex memory items like objects and arrays
  }

  // Step 2: Define the read method to read values from memory
  read(nodeName) {
    // Find a memory node in the stack with the given name
    const memoryNode = this.stack.find((item) => item.name === nodeName);

    //3 cases of memorynode
    // If no node is found, return 'no value found'
    if (!memoryNode) return "no value found";

    // If the node is uninitialized, return a reference error
    if (isUninitialized(memoryNode)) {
      return `Reference Error: Cannot Access '${memoryNode.kind}' before Initialization`;
    }

    // Return the node value directly if it's primitive, otherwise get the value from the heap
    return isPrimitive(memoryNode.dataType)
      ? memoryNode.value
      : getHeapValue(memoryNode, this.heap);
  }

  // Step 4: Define AssignValue method to assign new values to a node
  write(node, newval, scope) {
    // Find the node name in the stack

    // Try to find the memory node in the stack
    let memoryNode = this.stack.find((item) => item.name === node.name);
    // If the memory node doesn't exist, add it
    if (!memoryNode) {
      //shallow copy
      memoryNode = { ...node };
      memoryNode.value = undefined;
      this.stack.push(memoryNode);
      return false;
    }

    // Check if the node data type is primitive
    if (isPrimitive(node.dataType)) {
      // If primitive, assign the new value directly
      memoryNode.value = newval;
    } else {
      // If non-primitive:
      // Generate a new memory address
      let address = generateMemoryAddress();
      console.log("address:", address, node);
      // Set the memory node value to the new value
      memoryNode.value = address;
      // Update the node with the new value
      node.value = newval;
      // Log the new value for debugging purposes
      console.log("newval:", newval);
      // Store the node in the heap with the new address
      this.heap.set(address, node);
      // Update the memory node with the address reference
    }
    // Update the memory node with the current scope
    memoryNode.scope = scope;
  }

  // Other methods can be added here as needed...
}

// Step 6: Create an instance of the MemoryImp class
const Memory = new MemoryImp();

// Step 7: Export the Memory instance for use in other parts of the application
export { Memory };
