let Zoo =
{

   name: "Noah's Ark",
   capacity: 50,
   numberOfGuests: 1,
   animals: new Array()

};

for (const property in Zoo)
{

   console.log("Zoo property found: '" + property + "' ||| "
   + "The value of the property is: '" + Zoo[property] + "'");

}

for (let i = 0; i < Zoo.capacity - 1; i++)
{

   Zoo.numberOfGuests++;
   if (Zoo.numberOfGuests >= Zoo.capacity) {Zoo.numberOfGuests = Zoo.capacity;}
   console.log(`The ${Zoo.name}'s number of guests is: ${Zoo.numberOfGuests}`);

}

let nameDivNode = document.querySelector(".Name");
let capacityDivNode = document.querySelector(".Capacity");
let numberOfGuestsDivNode = document.querySelector(".NumberOfGuests");

nameDivNode.innerHTML = "The name of the zoo is: " + Zoo.name;
capacityDivNode.innerHTML = "The zoo capacity is: " + Zoo.capacity;
numberOfGuestsDivNode.innerHTML = "The zoo guest amount is: " + Zoo.numberOfGuests;

let Animal1 =
{
   Name: "Perry",
   Type: "Platypus",
   Age: 2,
   Gender: "Female",
   Weight: 3.2,
   IsPregnant: true
};

let Animal2 =
{
   Name: "Harry",
   Type: "Hummingbird",
   Age: 2,
   Gender: "Male",
   Weight: 3.2,
   IsPregnant: false
};

let Animal3 =
{
   Name: "Sherry",
   Type: "Shark",
   Age: 2,
   Gender: "Female",
   Weight: 852,
   IsPregnant: true
};

let Animal4 =
{
   Name: "Cherry",
   Type: "Chimpanzee",
   Age: 2,
   Gender: "Female",
   Weight: 3.2,
   IsPregnant: true
};

Zoo.animals.push(Animal1, Animal2, Animal3, Animal4);

console.log(Zoo.animals);