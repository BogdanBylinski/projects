import { compose, pipe } from "lodash/fp";

let username = "   Harley   ";
let message = "Hello " + username.trim() + " Good Morning!";

const trim = (name) => name.trim();
const generateMessage = (name) => `Hello ${name}, Good Morning!`;
const convertToUpper = (name) => name.toUpperCase();

const newFunc = pipe(trim, convertToUpper, generateMessage);
const result = newFunc(username);
console.log(result);
