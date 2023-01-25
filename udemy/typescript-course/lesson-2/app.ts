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

enum Role {ADMIN = 4 , READ_ONLY , AUTHOR};
const person={
    name:'Max',
    age:30,
    hobbies:['sports', 'cooking'],
    role:Role.ADMIN
}
console.log(person.name);
