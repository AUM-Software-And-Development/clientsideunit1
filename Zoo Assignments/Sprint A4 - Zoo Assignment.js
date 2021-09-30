let SelectListBox = document.createElement("select");
let First = true;

document.getElementById("SourceAnimals").onclick = () => {
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

  if (!First) {
    SelectListBox.remove();
  }

  SelectListBox = document.createElement("select");
  SelectListBox.size = Zoo.animals.length;
  let ZooDiv = document.querySelector(".Zoo");

  SelectListBox.name = "Animals";
  Zoo.animals.forEach((animal) => {
    console.log(animal);
    let selectableItem = document.createElement("option");
    selectableItem.value = animal.Name;
    selectableItem.text = animal.Name;
    SelectListBox.appendChild(selectableItem);
  });

  ZooDiv.appendChild(SelectListBox);
  First = false;
};
