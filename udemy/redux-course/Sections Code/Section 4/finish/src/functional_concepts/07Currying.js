import { compose, pipe } from "lodash/fp";

let username = "   Harley   ";
let message = "Hello " + username.trim() + " Good Morning!";

const trim = (name) => name.trim();
const generateMessage = (message) => (name) => `Hello ${name}, ${message}!`;
const convertToUpper = (name) => name.toUpperCase();

const newFunc = pipe(trim, convertToUpper, generateMessage("Have a nice day"));
const result = newFunc(username);
console.log(result);

// Example for Curring
function multi(a) {
    return function (b) {
        return a * b;
    };
}

const multiple = (a) => (b) => a * b;

let result1 = multi(2)(5);
