let username = "   Harley   ";
let message = "Hello " + username.trim() + " Good Morning!";

const trim = (name) => name.trim();
const generateMessage = (name) => `Hello ${name}, Good Morning!`;
const convertToUpper = (name) => name.toUpperCase();

const result = generateMessage(convertToUpper(trim(username)));
console.log(result);
