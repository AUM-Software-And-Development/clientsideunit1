let First = true;

let AnimalEditor = document.querySelector(".AnimalEditor");
AnimalEditor.hidden = true;

class AnimalForm {
  constructor(Name, Type, Age, Weight, Gender, IsPregnant) {
    this.Name = Name;
    this.Type = Type;
    this.Age = Age;
    this.Weight = Weight;
    this.Gender = Gender;
    this.IsPregnant = IsPregnant;
  }
}

class AnimalListBox {
  constructor(location, array, element) {
    this.SelectListBox = document.createElement("select");
    this.SelectListBox.size = array.length;
    this.location = location;
  }
}

class ZooInterface {
  constructor(name, capacity, numberOfGuests) {
    this.name = name;
    this.capacity = capacity;
    this.numberOfGuests = numberOfGuests;
    this.animals = new Array();
    this.cages = new Array();
  }
}

let DefaultZoo = new ZooInterface("Noah's Ark", 50, 1);
// The submit event handler duplicates the Zoo for some reason, which breaks recursion
var VolatileZoo = null;

// Animals instantiate
document.getElementById("SourceAnimals").onclick = () => {
  // Zoo instantiate
  if (!First) {
    EmptyCages(DefaultZoo);
  }

  DefaultZoo = new ZooInterface("Noah's Ark", 50, 1);

  DefaultZoo.animals.push(
    {
      Name: "Perry",
      Type: "Platypus",
      Age: 2,
      Weight: 3.2,
      Gender: "Female",
      IsPregnant: true,
    },

    {
      Name: "Harry",
      Type: "Hummingbird",
      Age: 2,
      Weight: 3.2,
      Gender: "Male",
      IsPregnant: false,
    },

    {
      Name: "Sherry",
      Type: "Shark",
      Age: 2,
      Weight: 852,
      Gender: "Female",
      IsPregnant: true,
    },

    {
      Name: "Cherry",
      Type: "Chimpanzee",
      Age: 2,
      Weight: 3.2,
      Gender: "Female",
      IsPregnant: true,
    }
  );

  FillCages(DefaultZoo);

  for (const property in DefaultZoo) {
    console.log(
      "Zoo property found: '" +
        property +
        "' ||| " +
        "The value of the property is: '" +
        DefaultZoo[property] +
        "'"
    );
  }

  for (let i = 0; i < DefaultZoo.capacity - 1; i++) {
    DefaultZoo.numberOfGuests++;
    if (DefaultZoo.numberOfGuests >= DefaultZoo.capacity) {
      DefaultZoo.numberOfGuests = DefaultZoo.capacity;
    }
    console.log(
      `The ${DefaultZoo.name}'s number of guests is: ${DefaultZoo.numberOfGuests}`
    );
  }

  RecursivelyBuildTheZoo(DefaultZoo);
};

var LastAnimal = 0;

function RecursivelyBuildTheZoo(Zoo) {
  // Define script elements to use
  FillCages(Zoo);

  // Define external elements
  const Form1 = new AnimalForm(
    document.querySelector(".AnimalName"),
    document.querySelector(".AnimalType"),
    document.querySelector(".AnimalAge"),
    document.querySelector(".AnimalWeight"),
    document.querySelector(".AnimalGender"),
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

  // Catches the zoo so that the event handlers don't cause duplicate reference errors
  VolatileZoo = Zoo;
  delete Zoo;

  // Gets the currently selected item each time the list box is clicked and fills the animal form
  VolatileZoo.cages[0].SelectListBox.onclick = () => {
    Zoo = VolatileZoo;
    FillAnimalForm(
      Form1,
      Zoo.cages[0].SelectListBox.options[
        Zoo.cages[0].SelectListBox.selectedIndex
      ].value,
      Zoo
    );
    delete Zoo;
  };

  // Unhide the form
  AnimalEditor.hidden = false;

  // User posts form data
  document.getElementById("AssignmentForm").addEventListener("submit", (e) => {
    Zoo = VolatileZoo;
    delete VolatileZoo;
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

function FillCages(Zoo) {
  Zoo.cages.forEach((cage) => {
    cage.SelectListBox.remove();
  });
  Zoo.cages = [];
  Zoo.cages.push(
    new AnimalListBox(document.querySelector(".ZooCages"), Zoo.animals)
  );
}

function EmptyCages(Zoo) {
  Zoo.cages.forEach((cage) => {
    cage.SelectListBox.remove();
  });
  Zoo.cages = [];
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

// Data
function GenerateTableHead(table, data) {
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

function PostZooData(Zoo) {
  let ZooNameDivNode = document.querySelector(".Name");
  let ZooCapacityDivNode = document.querySelector(".Capacity");
  let ZooGuestNumberDivNode = document.querySelector(".NumberOfGuests");

  let table = document.querySelector("table");
  let data = Object.keys(Zoo.animals[0]);

  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  ZooNameDivNode.innerHTML = "The name of this zoo is: " + Zoo.name;
  ZooCapacityDivNode.innerHTML = "This zoo's capacity is: " + Zoo.capacity;
  ZooGuestNumberDivNode.innerHTML =
    "This zoo's current guest amount is: " + Zoo.numberOfGuests;

  // Generate table first to get the table body
  GenerateTable(table, Zoo.animals);
  GenerateTableHead(table, data);
}
