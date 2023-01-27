"use strict";
// const person:{
//     name:string;
//     age : number;
//     hobbies:string[];
//     role:[number , string];
// }={
// const person={
//     name:'Max',
//     age:30,
//     hobbies:['sports', 'cooking'],
//     role:[2, 'author']
// }
// const ADMIN = 0
// const READ_ONLY = 1
// const AUTHOR = 2
// const person:{
//     name:string;
//     age : number;
//     hobbies:string[];
//     role:
// }={
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 4] = "ADMIN";
    Role[Role["READ_ONLY"] = 5] = "READ_ONLY";
    Role[Role["AUTHOR"] = 6] = "AUTHOR";
})(Role || (Role = {}));
;
const person = {
    name: 'Max',
    age: 30,
    hobbies: ['sports', 'cooking'],
    role: Role.ADMIN
};
console.log(person.name);
