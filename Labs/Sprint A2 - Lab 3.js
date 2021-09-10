// let age = 50;
// let age2 = age;
// console.log(age, age2);
// age = 100;
// console.log(age, age2);

// let firstName = "Clay";
// let firstName2 = firstName;
// console.log(firstName, firstName2);
// firstName = "Bob";
// console.log(firstName, firstName2);

// Array
const people = ["Clay", "Ray", "Zach", "Dom"];
// Let's make a copy?... no because when we do this...it is making a reference (ref)
// const groupPeople = people;
// console.log(people, groupPeople);
// Can we do something like this?
// groupPeople[3] = "Kimberly";
// console.log(people, groupPeople);
// Use slice...copy or ref?...copy
// const groupPeople2 = people.slice();
// groupPeople2[3] = "Kimberly";
// console.log(people, groupPeople2);
// can we use concat? Yes... it is a copy
// const groupPeople3 = [].concat(people);
// groupPeople3[3] = "Kimberly";
// console.log(people, groupPeople3);
// Spread is a copy!
// const groupPeople4 = [...people];
// groupPeople4[3] = "Kimberly";
// console.log(people, groupPeople4);
// const groupPeople5 = Array.from(people);
// groupPeople5[3] = "Kimberly";
// console.log(people, groupPeople5);

// Objects
// const person = { firstName: "Clay", age: 50 };
// Make a copy or ref?
// const teacher = person;
// teacher.age = 40;
// console.log(person, teacher);
// Make a real copy
// const teacher2 = Object.assign({}, person, { age: 40 });
// console.log(person, teacher2);
// Use spread
// const teacher3 = { ...person };
// teacher3.age = 40;
// console.log(person, teacher3);

// What about deep objects and arrays?
const clay = {
    name: "Clay",
    age: 47,
    hobbies: {
        hobby_one: "music",
        hobby_two: "horses",
    },
};
console.log(clay);
const fsDev = { ...clay };
console.log(fsDev);
fsDev.name = "Ray";
console.log(clay, fsDev);
fsDev.hobbies.hobby_one = "Star Wars";
