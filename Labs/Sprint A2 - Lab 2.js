const people = [
    { name: "Zach", year: 2015 },
    { name: "Ray", year: 2010 },
    { name: "Dom", year: 2005 },
    { name: "Clay", year: 2000 },
];

const comments = [
    { text: "JS Rules!", id: 123 },
    { text: "HTML is cool!", id: 456 },
    { text: "CSS is the best!", id: 789 },
    { text: "C# is very nice!", id: 012 },
    { text: "IT is the mostest!", id: 345 },
];

// Array.prototype.some()
// Is the year that have pass at least 10
const isOverTen = people.some((person) => {
    const currentYear = new Date().getFullYear();
    // If statement
    // if (currentYear - person.year >= 10) {
    //     return true;
    // }
    return currentYear - person.year >= 10;
});

console.log("isOverTen: ", isOverTen);

// Array.prototype.every()
// Is the years that have pass at least 10
const allOverTen = people.every((person) => {
    const currentYear = new Date().getFullYear();
    // If statement
    // if (currentYear - person.year >= 10) {
    //     return true;
    // }
    return currentYear - person.year >= 10;
});

console.log("allOverTen: ", allOverTen);

// Array.prototype.find()
// Find the comment with the id of 789
const comment = comments.find((comment) => comment.id === 789);

console.log("comment: ", comment);

// Array.prototype.findIndex()
// Find the comment with the id of 789
const indexComment = comments.findIndex((comment) => comment.id === 789);

console.log("indexComment: ", indexComment);
