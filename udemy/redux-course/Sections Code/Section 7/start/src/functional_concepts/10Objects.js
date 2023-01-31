const employee = {
    name: "Harley",
    age: 22,
    company: { country: "Cananda", city: "Toronto" },
};

// const newEmployee = Object.assign({}, employee, { name: "Martin" });
const newEmployee = {
    ...employee,
    name: "Martin",
    company: { ...employee.company, city: "Calgary" },
};

console.log(employee);
console.log(newEmployee);
