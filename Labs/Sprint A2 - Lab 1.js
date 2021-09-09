const products = [
    { id: 200, name: "Widgets", quantity: 25, bought: 2008, sold: 2010 },
    { id: 201, name: "Gadgets", quantity: 17, bought: 2010, sold: 2013 },
    { id: 202, name: "Dodads", quantity: 30, bought: 2009, sold: 2016 },
    { id: 203, name: "Toggles", quantity: 12, bought: 2009, sold: 2011 },
    { id: 204, name: "Doilies", quantity: 25, bought: 2013, sold: 2014 },
    { id: 205, name: "FooBars", quantity: 1, bought: 2014, sold: 2015 },
    { id: 206, name: "Fidgets", quantity: 20, bought: 2008, sold: 2019 },
    { id: 207, name: "Fiddles", quantity: 19, bought: 2013, sold: 2017 },
    { id: 208, name: "Faddles", quantity: 10, bought: 2010, sold: 2020 },
    { id: 209, name: "Frills", quantity: 9, bought: 2007, sold: 2014 },
];

const students = [
    "Coyne, Joe",
    "Hensen, Fred",
    "Roselle, Ethel",
    "Curry, Barney",
    "Hilgart, Wilma",
    "Statz, Greg",
    "Stanley, Mark",
    "Flynn, Sandy",
    "Foley, Chris",
    "Bristol, Dan",
];

// Array.prototype.filter()
// Filter the list of products for those that have a quantity between 10 and 19
const teens = products.filter(
    (product) => product.quantity > 10 && product.quantity < 20
);

console.log("teens: ", teens);

// Array.prototype.map()
// Give us an array of product names and quantity
const productQty = products.map(
    (product) => `${product.name} - ${product.quantity}`
);

console.log("productQty", productQty);

// Array.prototype.sort()
// Sort the products by quantity lowest to highest
// const order = products.sort((a, b) => {
//     if (a.quantity > b.quantity) {
//         return 1;
//     } else {
//         return -1;
//     }
// });

const ordered = products.sort((a, b) => (a.quantity > b.quantity ? 1 : -1));

console.table(ordered);

// Array.prototype. reduce()
// How

const totalYears = products.reduce((total, product) => {
    return total + (product.sold - product.bought);
}, 0);

console.log("totalYears: ", totalYears);

// Sort through the products by years on the shelf
const oldest = products.sort((a, b) => {
    const lastProduct = a.sold - a.bought;
    const nextProduct = b.sold - b.bought;
    return lastProduct > nextProduct ? -1 : 1;
});

console.table(oldest);

// Work with students data
// Sort students alphabetically by last name
const alpha = students.sort((lastStudent, nextStudent) => {
    const [aLast, aFirst] = lastStudent.split(", ");
    const [bLast, bFirst] = nextStudent.split(", ");
    return aLast > bLast ? 1 : -1;
});

console.log("alpha: ", alpha);

// Sum up each of these items
const vehicles = [
    "truck",
    "car",
    "van",
    "skateboard",
    "walk",
    "truck",
    "truck",
    "car",
    "car",
    "car",
    "van",
    "walk",
    "walk",
];

const modeTransport = vehicles.reduce((mode, index) => {
    if (!mode[index]) {
        mode[index] = 0;
    }
    mode[index]++;
    return mode;
});

console.log("modeTransport: ", modeTransport);

// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
// Create a list of streets in Paris that have 'de' in the name

// const category = document.querySelector(".mw-category");
// const links = Array.from(category.querySelectorAll("a"));
// const de = links
//     .map((link) => link.textContent)
//     .filter((streetName) => streetName.includes("de"));
