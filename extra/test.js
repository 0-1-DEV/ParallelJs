//node --v8-options | grep -B0 -A1 stack-size

// function memoryUsed() {
//   const mbUsed = process.memoryUsage().heapUsed / 1024 / 1024;
//   console.log(`Memory used: ${mbUsed} MB`);
// }

// console.log("before");
// memoryUsed();

// const bigString = "x".repeat(10 * 1024 * 1024);
// console.log(bigString); // need to use the string otherwise the compiler would just optimize it into nothingness

// console.log("after");
// memoryUsed();

console.log("num:", num);
let num = 12;
