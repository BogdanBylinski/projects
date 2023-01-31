import { produce } from "immer";

const employee = {
    name: "Harley",
    age: 22,
    company: { country: "Cananda", city: "Toronto" },
};

// const newEmployee = {
//     ...employee,
//     name: "Martin",
//     company: { ...employee.company, city: "Calgary" },
// };
const newEmployee = produce(employee, (draftState) => {
    (draftState.name = "Martin"), (draftState.company.city = "Calgary");
});

console.log(employee);
console.log(newEmployee);
