let First = true;

let AnimalEditor = document.querySelector(".AnimalEditor");
AnimalEditor.hidden = true;

class AnimalForm {
  constructor(Name, Type, Age, Gender, Weight, IsPregnant) {
    this.Name = Name;
    this.Type = Type;
    this.Age = Age;
    this.Gender = Gender;
    this.Weight = Weight;
    this.IsPregnant = IsPregnant;
  }
}

class AnimalListBox {
  constructor(location, array) {
    this.SelectListBox = document.createElement("select");
    this.SelectListBox.size = array.length;
    this.location = location;
  }
}

// Zoo instantiate
let NoahsArk = {
  name: "Noah's Ark",
  capacity: 50,
  numberOfGuests: 1,
  animals: new Array(),
  cages: [],
};

// Animals instantiate
document.getElementById("SourceAnimals").onclick = () => {
  NoahsArk.animals = [
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
  RecursivelyBuildTheZoo(NoahsArk);
};

var LastAnimal = 0;

function RecursivelyBuildTheZoo(Zoo) {
  // Define script elements to use
  if (Zoo.cages) {
    Zoo.cages.forEach((cage) => {
      cage.SelectListBox.remove();
    });
    Zoo.cages = [];
  }
  Zoo.cages.push(
    new AnimalListBox(document.querySelector(".ZooCages"), Zoo.animals)
  );

  // Define external elements
  const Form1 = new AnimalForm(
    document.querySelector(".AnimalName"),
    document.querySelector(".AnimalType"),
    document.querySelector(".AnimalAge"),
    document.querySelector(".AnimalGender"),
    document.querySelector(".AnimalWeight"),
    document.querySelector(".AnimalPregnancy")
  );

  // Loop through animals and create a list item for each
  Zoo.animals.forEach((animal) => {
    let selectableItem = document.createElement("option");
    selectableItem.value = animal.Name;
    selectableItem.text = animal.Name;
    Zoo.cages[0].SelectListBox.appendChild(selectableItem);
  });

  // Add the data to the listbox location
  Zoo.cages[0].location.appendChild(Zoo.cages[0].SelectListBox);

  // Fill the animal form using the default animal
  if (!First) {
    FillAnimalForm(Form1, Zoo.animals[LastAnimal].Name, Zoo);
    Zoo.cages[0].SelectListBox[LastAnimal].selected = true;
  } else {
    FillAnimalForm(Form1, "Perry", Zoo);
    // Code has ran. The default item gets selected
    Zoo.cages[0].SelectListBox[0].selected = true;
  }

  First = false;

  PostZooData(Zoo);

  // Gets the currently selected item each time the list box is clicked and fills the animal form
  Zoo.cages[0].SelectListBox.onclick = () => {
    FillAnimalForm(
      Form1,
      Zoo.cages[0].SelectListBox.options[
        Zoo.cages[0].SelectListBox.selectedIndex
      ].value,
      Zoo
    );
  };

  // Unhide the form
  AnimalEditor.hidden = false;

  // User posts form data
  document.getElementById("AssignmentForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let animalChanges = new FormData(document.getElementById("AssignmentForm"));
    let objectReplacement = [];
    for (let kvp of animalChanges.entries()) {
      objectReplacement.push(kvp[1]);
    }
    let newAnimal = {
      Name: objectReplacement[0],
      Type: objectReplacement[1],
      Age: objectReplacement[2],
      Weight: objectReplacement[3],
      Gender: objectReplacement[4],
      IsPregnant: objectReplacement[5],
    };
    Zoo.animals[Zoo.cages[0].SelectListBox.selectedIndex] = newAnimal;
    LastAnimal = Zoo.cages[0].SelectListBox.selectedIndex;
    RecursivelyBuildTheZoo(Zoo);
  });
}

// Fills a form using the form itself as a base
function FillAnimalForm(form, animalName, zoo) {
  // Place each animal field into a form to edit
  let i = 0;
  for (let field in form) {
    Object.values(form)[i].value = Object.values(
      zoo.animals[
        Object.keys(zoo.animals).find(
          (index) => zoo.animals[index].Name === animalName
        )
      ]
    )[i];
    i++;
  }
}

// Form API
function GetForm(key) {
  for (let i = 0; i < document.forms.length; i++) {
    if (document.forms[i].id === key) {
      return document.forms[i];
    }
  }
}

function PostZooData(Zoo) {
  let ZooNameDivNode = document.querySelector(".Name");
  let ZooCapacityDivNode = document.querySelector(".Capacity");
  let ZooGuestNumberDivNode = document.querySelector(".NumberOfGuests");

  let table = document.querySelector("table");
  let data = Object.keys(Zoo.animals[0]);

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

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

  // Generate table first to get the table body
  GenerateTable(table, Zoo.animals);
  generateTableHead(table, data);
}
