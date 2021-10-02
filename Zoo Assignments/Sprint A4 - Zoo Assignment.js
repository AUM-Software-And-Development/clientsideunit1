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
    EmptyTheCages(DefaultZoo);
  }

  First = true;

  DefaultZoo = new ZooInterface("Noah's Ark", 50, 1);

  DefaultZoo.animals.push(
    {
      Name: "Perry",
      Type: "Platypus",
      Age: 2,
      Weight: 3.2,
      Gender: "Female",
      IsPregnant: true,
      Caged: true,
    },

    {
      Name: "Harry",
      Type: "Hummingbird",
      Age: 2,
      Weight: 3.2,
      Gender: "Male",
      IsPregnant: false,
      Caged: true,
    },

    {
      Name: "Sherry",
      Type: "Shark",
      Age: 2,
      Weight: 852,
      Gender: "Female",
      IsPregnant: true,
      Caged: true,
    },

    {
      Name: "Cherry",
      Type: "Chimpanzee",
      Age: 2,
      Weight: 3.2,
      Gender: "Female",
      IsPregnant: true,
      Caged: true,
    }
  );

  FillTheCages(DefaultZoo);

  RecursivelyBuildTheZoo(DefaultZoo);
};

var LastAnimal = 0;

function RecursivelyBuildTheZoo(Zoo) {
  // Define script elements to use
  FillTheCages(Zoo);

  // Define external elements
  const Form1 = new AnimalForm(
    document.querySelector(".AnimalName"),
    document.querySelector(".AnimalType"),
    document.querySelector(".AnimalAge"),
    document.querySelector(".AnimalWeight"),
    document.querySelector(".AnimalGender"),
    document.querySelector(".AnimalPregnancy")
  );

  SetupCageDisplays(Zoo);

  // Fill the animal form using the default animal
  if (!First) {
    if (Zoo.cages[0].SelectListBox.lastChild)
    {
      Zoo.cages[0].SelectListBox.lastChild.selected = true;
      FillTheAnimalForm(Form1, Zoo.cages[0].SelectListBox.lastChild.value, Zoo);
    }
  } else {
    FillTheAnimalForm(Form1, "Perry", Zoo);
    // Code has ran. The default item gets selected
    if (Zoo.cages[0].SelectListBox.firstChild)
    {
      Zoo.cages[0].SelectListBox.firstChild.selected = true;
    }
  }

  First = false;

  OpenTheZoo(DefaultZoo);

  PostZooData(Zoo);

  // Catches the zoo so that the event handlers don't cause duplicate reference errors
  VolatileZoo = Zoo;
  delete Zoo;

Runtime_EventListeners:

  // Gets the currently selected item each time the list box is clicked and fills the animal form
  VolatileZoo.cages[0].SelectListBox.onclick = () => {
    Zoo = VolatileZoo;
    FillTheAnimalForm(
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
    if (!Zoo.cages[0].SelectListBox.firstChild)
    {
      window.alert("None of the animals are in a location that allows editing. Add an animal back to the cage to edit it.");
      return;
    }
    else
    {
      if (e.key === 'Enter')
      {
        Zoo = VolatileZoo;
        delete VolatileZoo;
        e.preventDefault();
        ApplyUserFormRequests(Zoo);
        RecursivelyBuildTheZoo(Zoo);
      }
      Zoo = VolatileZoo;
      delete VolatileZoo;
      e.preventDefault();
      ApplyUserFormRequests(Zoo);
      RecursivelyBuildTheZoo(Zoo);
    }
  });

  document.querySelector(".add-animal").onclick = (e) => {
    e.preventDefault();
    Zoo = VolatileZoo;
    delete VolatileZoo;
    AddAnimalFromForm(Zoo);
    RecursivelyBuildTheZoo(Zoo);
  };

  document.querySelector(".remove-animal").onclick = (e) => {
    e.preventDefault();
    Zoo = VolatileZoo;
    delete VolatileZoo;
    RemoveAnimalFromCage(Zoo);
    RecursivelyBuildTheZoo(Zoo);
  };
}

PlainFunctions:

function OpenTheZoo(Zoo) {
  for (let i = 0; i < Zoo.capacity - 1; i++) {
    Zoo.numberOfGuests++;
    if (Zoo.numberOfGuests >= Zoo.capacity) {
      Zoo.numberOfGuests = Zoo.capacity;
    }
    console.log(
      `The ${Zoo.name}'s number of guests is: ${Zoo.numberOfGuests}`
    );
  }
}

function FillTheCages(Zoo) {
  Zoo.cages.forEach((cage) => {
    cage.SelectListBox.remove();
  });
  Zoo.cages = [];
  Zoo.cages.push(
    new AnimalListBox(document.querySelector(".ZooCages"), Zoo.animals)
  );
}

function EmptyTheCages(Zoo) {
  Zoo.cages.forEach((cage) => {
    cage.SelectListBox.remove();
  });
  Zoo.cages = [];
}

function SetupCageDisplays(Zoo) {
    // Loop through animals and create a list item for each
    Zoo.animals.forEach((animal) => {
      if (animal.Caged)
      {
        let selectableItem = document.createElement("option");
        selectableItem.value = animal.Name;
        selectableItem.text = animal.Name;
        Zoo.cages[0].SelectListBox.appendChild(selectableItem);
      }
    });
  
    // Add the data to the listbox location
    Zoo.cages[0].location.appendChild(Zoo.cages[0].SelectListBox);
}

// Fills a form using the form itself as a base
function FillTheAnimalForm(form, animalName, zoo) {
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
    let count = 0;
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
      if (count === 6 && element[key])
      {
        cell.style.background = "#c42525c9";
      }
      else if (count === 6 && !element[key])
      {
        cell.style.background = "#009690";
      }
      count++;
    }
  }
}

function PostZooData(Zoo) {
  let ZooNameDivNode = document.querySelector(".Name");
  let ZooCapacityDivNode = document.querySelector(".Capacity");
  let ZooAnimalNumberDivNode = document.querySelector(".NumberOfAnimals");
  let ZooAnimalsCagedNumberDivNode = document.querySelector(".NumberOfAnimalsInACage");
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
  ZooAnimalNumberDivNode.innerHTML = "This zoo's current animal amount is: " + Zoo.animals.length;

  let cagedCount = 0;
  Zoo.animals.forEach((animal) => {
    if (animal.Caged){
      cagedCount++;
    }
  })
  ZooAnimalsCagedNumberDivNode.innerHTML = "This zoo's current caged animal amount is: " + cagedCount;


  // Generate table first to get the table body
  GenerateTable(table, Zoo.animals);
  GenerateTableHead(table, data);
}

function ApplyUserFormRequests(Zoo) {
  let animalChanges = new FormData(document.getElementById("AssignmentForm"));
  let objectReplacement = [];
  for (let kvp of animalChanges.entries()) {
    objectReplacement.push(kvp[1]);
  }
  let test = objectReplacement[4].toLowerCase();
  switch (test)
  {
    case "male":
      break;
    case "female":
      break;
    default:
      alert("A value of female or male must be entered to denote a gender");
      return;
  }
  test = objectReplacement[5].toLowerCase();
  switch (test)
  {
    case "true":
      break;
    case "false":
      break;
    default:
      alert("A value of true or false must be entered to denote a pregnancy");
      return;
  }

  let newAnimal = {
    Name: objectReplacement[0],
    Type: objectReplacement[1],
    Age: objectReplacement[2],
    Weight: objectReplacement[3],
    Gender: objectReplacement[4],
    IsPregnant: objectReplacement[5],
    Caged: true,
  };
  Zoo.animals.forEach((animal) => {
    if (animal.Name === Zoo.cages[0].SelectListBox.options[Zoo.cages[0].SelectListBox.selectedIndex].value)
    {
      let cageStatus = false;
      if (animal.Caged === true)
      {
       cageStatus = true;
      }
      newAnimal.Caged = cageStatus;
      Object.assign(animal, newAnimal);
      console.log(animal);
    }
  })
}

function AddAnimalFromForm(Zoo) {
  let animalInfo = new FormData(document.getElementById("AssignmentForm"));
  let objectData = [];
  let breaker = false;
  for (let kvp of animalInfo.entries()) {
    Zoo.animals.forEach((animal) => {
      if (animal.Name === kvp[1])
      {
        animal.Caged = true;
        window.alert("This animal has been added back to the cage. Change the name to add a new animal.");
        breaker = true;
        return;
        // Javascript doesn't actually return to main from this point. It just returns to the for loop
      }
    })
    if (breaker)
    {
      return;
    }
    objectData.push(kvp[1]);
  }
  let newAnimal = {
    Name: objectData[0],
    Type: objectData[1],
    Age: objectData[2],
    Weight: objectData[3],
    Gender: objectData[4],
    IsPregnant: objectData[5],
    Caged: true,
  };
  Zoo.animals.push(newAnimal);
}

function RemoveAnimalFromCage(Zoo) {
  let nameForRemoval = Zoo.cages[0].SelectListBox.value;
  Zoo.animals.forEach((animal) => {
    if (animal.Name === nameForRemoval)
    {
      animal.Caged = false;
    }
  });
}