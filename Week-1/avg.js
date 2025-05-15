//Get Command Line Arguments
const args = process.argv.slice(2);
//Check if No Arguments Provided
if (args.length === 0) {
  console.log("Please provide numbers as command-line arguments.");
  process.exit(1);
}
//Convert Strings to Numbers
const numbers = args.map(Number);
if (numbers.some(isNaN)) {
  console.log("All arguments must be valid numbers.");
  process.exit(1);
}
//Check if No Valid Numbers
if (numbers.length === 0) {
  console.log("No valid numbers provided.");
  process.exit(1);
}
// Calculate Average
const sum = numbers.reduce((acc, num) => acc + num, 0);
const average = sum / numbers.length;
console.log(average);
