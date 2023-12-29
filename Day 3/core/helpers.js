// Helper method to check if a node is uninitialized

import chalk from "chalk";
import { Memory } from "./memory.js";

// Helper method to get value from heap
function getHeapValue(node, heap) {
  const heapNode = heap.get(node.value);

  return heapNode;
}

function generateMemoryAddress() {
  // Generate a random number between 0x1000 (4096) and 0xFFFF (65535)
  let address = Math.floor(Math.random() * (0xffff - 0x1000 + 1)) + 0x1000;
  // Convert it to a hexadecimal string
  return "0x" + address.toString(16).toUpperCase();
}

function logMemory() {
  console.log(chalk.blue("Stack Memory:"));

  let x = Memory.stack.map((item) => ({
    Name: item.name,
    Value: item.value || item.address, // replace property1 with the actual property name
    // replace property1 with the actual property name
  }));

  console.table(x);

  console.log(chalk.blue("Heap Memory:"));

  let y = Array.from(Memory.heap.entries()).map(([key, value]) => ({
    Address: key,
    Value: value.value,
  }));

  console.table(y);
}

export { getHeapValue, generateMemoryAddress, logMemory };
