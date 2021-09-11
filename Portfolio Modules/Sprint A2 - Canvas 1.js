// Assign references to the document elements
const Canvas = document.querySelector(".canvas");
const Ctx = Canvas.getContext("2d");
const Scale = 10;

// Define a number of rows and colums based on the scale
// of the animals and fruits, so there are no video
// displacements, by referencing the canvas element
// distances.
const Rows = Canvas.height / Scale;
const Columns = Canvas.width / Scale;

// Instantiate an array to hold the animals (snakes)
let Snakes = [new SnakeVisual(1, "#00ff00")];

// Instantiate an array to hold the fruits for animals
let Fruits = [
    (fruit1 = new FruitVisual("#ff0000")),
    (fruit2 = new FruitVisual("#002200")),
    (fruit3 = new FruitVisual("#0000aa")),
];

// Simulate the finding of corrupt data
Fruits.push(new FruitVisual("#000000"));
let DiscardedFruit = Fruits.splice(3, 1);
console.log(
    "Removed a rotten fruit from the basket: ",
    DiscardedFruit[0].Color
);

/* This is a recursive function that doesn't end.
 * It will recall over and over again at an interval of 120
 * milliseconds.
 */

(function Setup() {
    // Assign each fruit to have random locations
    Fruits.forEach((fruit) => {
        fruit.SetRandom();
    });

    // Call the javascript re-run method
    window.setInterval(() => {
        // Clear the canvas
        Ctx.clearRect(0, 0, Canvas.width, Canvas.height);

        // Draw each fruit
        Fruits.forEach((fruit) => {
            fruit.Draw();
        });

        // Update only one of the snakes with any pending data changes
        // then draw it
        Snakes[0].Update();
        Snakes[0].Draw();

        // Iterate through the fruits and check if the snake has
        // landed on it to determine if it is being eaten
        // if it is consumed, then draw a new fruit from the same
        // object, and console log the chosen snake
        Fruits.forEach((fruit) => {
            if (Snakes[0].EatAFruit(fruit, Snakes[0])) {
                fruit.SetRandom();
                fruit.Draw();
            }
        });
        // Recurse after 120 milliseconds
    }, 128);
})();

// If a key is pressed outside of the loop, notify the classes
// in the snakes array to update their data baseed on the key
window.addEventListener("keydown", (event) => {
    Snakes[0].ChangeDirection(event.key);
});
