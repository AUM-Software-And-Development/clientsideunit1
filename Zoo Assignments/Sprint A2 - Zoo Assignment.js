let ZooNameDivNode = document.querySelector(".Name");
let ZooCapacityDivNode = document.querySelector(".Capacity");
let ZooGuestNumberDivNode = document.querySelector(".NumberOfGuests");

let Zoo = {
    name: "Noah's Ark",
    capacity: 50,
    numberOfGuests: 1,
    animals: new Array(),
};

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

let Animal1 = {
    Name: "Perry",
    Type: "Platypus",
    Age: 2,
    Gender: "Female",
    Weight: 3.2,
    IsPregnant: true,
};

let Animal2 = {
    Name: "Harry",
    Type: "Hummingbird",
    Age: 2,
    Gender: "Male",
    Weight: 3.2,
    IsPregnant: false,
};

let Animal3 = {
    Name: "Sherry",
    Type: "Shark",
    Age: 2,
    Gender: "Female",
    Weight: 852,
    IsPregnant: true,
};

let Animal4 = {
    Name: "Cherry",
    Type: "Chimpanzee",
    Age: 2,
    Gender: "Female",
    Weight: 3.2,
    IsPregnant: true,
};

Zoo.animals.push(Animal1, Animal2, Animal3, Animal4);
console.log(Zoo.animals);

ZooNameDivNode.innerHTML = "The name of the zoo is: " + Zoo.name;
ZooCapacityDivNode.innerHTML = "The zoo capacity is: " + Zoo.capacity;
ZooGuestNumberDivNode.innerHTML =
    "The zoo guest amount is: " + Zoo.numberOfGuests;

function generate_table() {
    // get the reference for the body
    var body = document.querySelector(".Zoo");

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // creating all cells
    for (var i = 0; i < 4; i++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var j = 0; j < 6; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            var cellText = document.createTextNode(
                `${Object.keys(Zoo.animals[i])[j]}, ${
                    Object.values(Zoo.animals[i])[j]
                }`
            );
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
}

generate_table();
