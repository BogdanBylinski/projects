const numbers = [10, 20, 30, 40];

// Adding Items
const index = numbers.indexOf(30);
const addedNumbers = [...numbers.slice(0, index), 50, ...numbers.slice(index)];

// Updating Items
const updated = numbers.map((a) => (a === 40 ? 80 : a));

// Removing Items
const removed = numbers.filter((a) => a !== 30);
console.log(removed);
