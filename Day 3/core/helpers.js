// Helper method to check if a node is uninitialized
function isUninitialized(node) {}

// Helper method to get value from heap
function getHeapValue(node, heap) {}
// Determines if a data type is a primitive
function isPrimitive(dataType) {}
function generateMemoryAddress() {
  // Generate a random number between 0x1000 (4096) and 0xFFFF (65535)
  let address = Math.floor(Math.random() * (0xffff - 0x1000 + 1)) + 0x1000;
  // Convert it to a hexadecimal string
  return "0x" + address.toString(16).toUpperCase();
}

export { isUninitialized, getHeapValue, isPrimitive, generateMemoryAddress };
