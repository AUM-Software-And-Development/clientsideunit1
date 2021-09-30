let SelectListBox = document.createElement("select");
let First = true;

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
let Zoo = {
  name: "Noah's Ark",
  capacity: 50,
  numberOfGuests: 1,
  animals: new Array(),
};

// Animals instantiate
document.getElementById("SourceAnimals").onclick = () => {
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

  // If not the first run, rebuilt the list or it will duplicate
  if (!First) {
    Cage1.SelectListBox.remove();
  }

  // Define script elements to use
  const Cage1 = new AnimalListBox(document.querySelector(".Zoo"), Zoo.animals);

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
  SelectListBox.name = "Animals";
  Zoo.animals.forEach((animal) => {
    console.log(animal);
    let selectableItem = document.createElement("option");
    selectableItem.value = animal.Name;
    selectableItem.text = animal.Name;
    Cage1.SelectListBox.appendChild(selectableItem);
  });

  FillAnimalForm(Form1, "Perry");
  Cage1.SelectListBox[0].selected = true;
  Cage1.location.appendChild(Cage1.SelectListBox);
  First = false;

  // Gets the currently selected item each time the list box is clicked and fills the animal form
  Cage1.SelectListBox.onclick = () => {
    FillAnimalForm(
      Form1,
      Cage1.SelectListBox.options[Cage1.SelectListBox.selectedIndex].value
    );
  };

  document.getElementById("ChangeAnimals").onclick = () => {};
};

// Fills a form using the form itself as a base
function FillAnimalForm(form, animalName) {
  // Place each animal field into a form to edit
  let i = 0;
  for (let field in form) {
    Object.values(form)[i].value = Object.values(
      Zoo.animals[
        Object.keys(Zoo.animals).find(
          (index) => Zoo.animals[index].Name === animalName
        )
      ]
    )[i];
    i++;
  }
}

function ApplyChanges() {}
