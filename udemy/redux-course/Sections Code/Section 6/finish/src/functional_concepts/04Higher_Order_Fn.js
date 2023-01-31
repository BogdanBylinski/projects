// This both are Higher Order Function
function greeting() {
    return function () {
        return "Good Morning!";
    };
}

function printMessage(anfunction) {
    console.log(anfunction());
}

// Another Example
let numbers = [1, 2, 3, 4];

numbers.map((number) => number * 10);
