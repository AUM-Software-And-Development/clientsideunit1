const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const operationDisplay = document.querySelector(".currentoperation");
const numbersElement = document.querySelectorAll(".number");
const operationElement = document.querySelectorAll(".operation");
const equalElement = document.querySelector(".equal");
const clearElement = document.querySelector(".all-clear");
const clearLastElement = document.querySelector(".clear-last-entity");

let display1Value = "";
let display2Value = "";
let result = null;
let lastOperation = "";
let allowDecimal = true;
let display = 1;

//// This section listens for an event on a grid of buttons
// It then runs it through a series of gates to determine which
// mapping to follow ascertained by the exact key which has been pressed
numbersElement.forEach((number) => {
  number.addEventListener("click", (e) => {
    let value = e.target.innerText;
    console.log(value);
    // Take a value from the document constants above
    // if a decimal is requested, ensure that it is only used one time
    switch (value) {
      case ".":
        if (allowDecimal === true) {
          switch (display) {
            case 1:
              display1Value += value;
              display1.innerText = display1Value;
              break;
            case 2:
              display2Value += value;
              display2.innerText = display2Value;
              break;
          }
          allowDecimal = false;
          break;
        } else {
          break;
        }
      // By default use the numbers clicked
      default:
        switch (display) {
          case 1:
            display1Value += value;
            display1.innerText = display1Value;
            break;
          case 2:
            display2Value += value;
            display2.innerText = display2Value;
            break;
        }
        break;
    }
  });
});

//// This object holds certain instructions for each switch series
// some people call this a "factory" setup
let Operations = [
  { id: "EqualSwitch", status: false, symbol: "=" },
  { id: "PlusSwitch", status: false, symbol: "+" },
  { id: "MinusSwitch", status: false, symbol: "-" },
  { id: "TimesSwitch", status: false, symbol: "X" },
  { id: "DivideSwitch", status: false, symbol: "/" },
  { id: "ModuloSwitch", status: false, symbol: "%" },
];

//// This section will loop through each operation if one is clicked,
// like the gate series above, only it only calls for action if a button
// with an operation class has been pressed instead
operationElement.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    let key = e.target.innerText;
    console.log(key);

    // This series of switches sets the operations object arrays
    // to hold either true or false values depending on which item
    // is pressed, and resets all others since only one operation can
    // be applied per equality
    switch (key) {
      // If the up down button is clicked, set the gate value
      // that changes the location to display incoming numbers
      case "UpDwn":
        switch (display) {
          case 1:
            display = 2;
            break;
          case 2:
            display = 1;
            break;
        }
        break;
      // If equal is clicked, calculate based on the most recent
      // operation requested
      case "=":
        var id = GetCurrentOperation();
        console.log(id);
        let calculatedValue = CalculateValue(id);
        break;
      // These are all regular math operations which should be a given
      // The operation objective booleans are set in these function calls
      case "+":
        OnOperationClick("PlusSwitch");
        break;
      case "-":
        OnOperationClick("MinusSwitch");
        break;
      case "X":
        OnOperationClick("TimesSwitch");
        break;
      case "/":
        OnOperationClick("DivideSwitch");
        break;
      case "%":
        OnOperationClick("ModuloSwitch");
        break;
      // If the screen is requested to be cleared clear it.
      case "CE":
        display1.innerText = "0";
        display2.innerText = "0";
        display1Value = "";
        display2Value = "";
        break;
      case "C":
        switch (display) {
          case 1:
            display1.innerText = "0";
            display1Value = "";
            break;
          case 2:
            display2.innerText = "0";
            display2Value = "";
            break;
        }
        break;
    }
  });
});

// On first use, auto change the destination displayer
let SwitchOnce = true;

let OnOperationClick = (caller) => {
  if (SwitchOnce) {
    switch (display) {
      case 1:
        display = 2;
        break;
      case 2:
        display = 1;
        break;
    }
    SwitchOnce = false;
  }

  // For each operation in the object array, check if its id matches what was passed in
  // and if it does, set the gate status to allowed, and allow others to false
  Operations.forEach((operation) => {
    if (operation.id === caller) {
      operation.status = true;
      operationDisplay.innerText = operation.symbol;
    } else {
      operation.status = false;
    }
  });
  console.log(Operations);
};

// Find the operation that is presently true
let GetCurrentOperation = () => {
  var flag;
  Operations.forEach((operation) => {
    if (operation.status) {
      console.log(operation);
      flag = operation.id;
    }
  });
  return flag;
};

// Calculate a value using the operation sent in
let CalculateValue = (operation) => {
  switch (operation) {
    case "PlusSwitch":
      display1Value = parseFloat(display1Value) + parseFloat(display2Value);
      display1.innerText = display1Value;
      break;
    case "MinusSwitch":
      display1Value = parseFloat(display1Value) - parseFloat(display2Value);
      display1.innerText = display1Value;
      break;
    case "TimesSwitch":
      display1Value = parseFloat(display1Value) * parseFloat(display2Value);
      display1.innerText = display1Value;
      break;
    case "DivideSwitch":
      display1Value = parseFloat(display1Value) / parseFloat(display2Value);
      display1.innerText = display1Value;
      break;
    case "ModuloSwitch":
      display1Value = parseFloat(display1Value) % parseFloat(display2Value);
      display1.innerText = display1Value;
      break;
  }
};
