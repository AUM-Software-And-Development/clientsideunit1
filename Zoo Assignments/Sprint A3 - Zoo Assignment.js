let ZooNameDivNode = document.querySelector(".Name");
let ZooCapacityDivNode = document.querySelector(".Capacity");
let ZooGuestNumberDivNode = document.querySelector(".NumberOfGuests");

let Zoo = {
  name: "Noah's Ark",
  capacity: 50,
  numberOfGuests: 1,
  animals: new Array(),
};

Zoo.animals = [
  {
    Name: "Perry",
    Type: "Platypus",
    Age: 2,
    Gender: "Female",
    Weight: 3.2,
    IsPregnant: true,
  },

  {
    Name: "Harry",
    Type: "Hummingbird",
    Age: 2,
    Gender: "Male",
    Weight: 3.2,
    IsPregnant: false,
  },

  {
    Name: "Sherry",
    Type: "Shark",
    Age: 2,
    Gender: "Female",
    Weight: 852,
    IsPregnant: true,
  },

  {
    Name: "Cherry",
    Type: "Chimpanzee",
    Age: 2,
    Gender: "Female",
    Weight: 3.2,
    IsPregnant: true,
  },
];

for (const property in Zoo) {
  console.log(
    "Zoo property found: '" +
      property +
      "' ||| " +
      "The value of the property is: '" +
      Zoo[property] +
      "'"
  );
}

for (let i = 0; i < Zoo.capacity - 1; i++) {
  Zoo.numberOfGuests++;
  if (Zoo.numberOfGuests >= Zoo.capacity) {
    Zoo.numberOfGuests = Zoo.capacity;
  }
  console.log(`The ${Zoo.name}'s number of guests is: ${Zoo.numberOfGuests}`);
}

console.log(Zoo.animals);

ZooNameDivNode.innerHTML = "The name of the zoo is: " + Zoo.name;
ZooCapacityDivNode.innerHTML = "The zoo capacity is: " + Zoo.capacity;
ZooGuestNumberDivNode.innerHTML =
  "The zoo guest amount is: " + Zoo.numberOfGuests;

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function GenerateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

let table = document.querySelector("table");
let data = Object.keys(Zoo.animals[0]);
// Generate table first to get the table body
GenerateTable(table, Zoo.animals);
generateTableHead(table, data);
