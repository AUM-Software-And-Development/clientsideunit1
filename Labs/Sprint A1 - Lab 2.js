/**
 * Blackjack game in JavaScript
 */

let

suits = ["Hearts", "Clubs", "Diamonds", "Spades"],

values = ["Ace", "King", "Queen", "Jack",
"Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"],

deck = [];

// Loop iteration

for (let i = 0; i < suits.length; i++)
{

   for (let j = 0; j < values.length; j++)
   {

      deck.push(values[j] + " of " + suits[i]);

   };

};

let playerCards = [deck[0], deck[2]];

console.log("Welcome to blackjack!");
console.log("You are dealt: ");
console.log(playerCards[0] + " & " + playerCards[1]);
console.log(deck);