"use strict";
function add(n1, n2) {
    return n1 + n2;
}
function printeResult(num) {
    console.log('Result: ' + num);
}
printeResult((add(5, 12)));
let combineValues;
combineValues = add;
combineValues = printeResult;
console.log(combineValues(8, 8));
