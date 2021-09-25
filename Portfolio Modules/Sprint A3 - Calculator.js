const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const operationDisplay = document.querySelector(".currentoperation");
const numbersElement = document.querySelectorAll(".number");
const operationElement = document.querySelectorAll(".operation");
const equalElement = document.querySelector(".equal");
const clearElement = document.querySelector(".all-clear");
const clearLastElement = document.querySelector(".clear-last-entity");
const history = document.querySelector(".dynamiclist");
const themebutton = document.querySelector(".theme-button");
let themedcontainer = document.getElementById("dynamic-container");

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

    if (Reset) {
      display = 1;
      Reset = false;
    }

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

//// This holds the calculated history index
let element = 0;

//// Reset display or start at the default
let Reset = true;

//// This section will loop through each operation if one is clicked,
// like the gate series above, only it only calls for action if a button
// with an operation class has been pressed instead
operationElement.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    let key = e.target.innerText;
    console.log(key);

    if (Reset) {
      display = 1;
      Reset = false;
    }

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
        // Catch the calculated value
        let calculatedValue = CalculateValue(id);
        // Apply the value or replace it if the index is full
        if (element > 1) element = 0;
        let zeroFill = document.createTextNode("");
        let newText = document.createTextNode(
          (element === 0 ? "x" : "y") + ": " + calculatedValue + " "
        );
        history.replaceChild(zeroFill, history.childNodes[0]);
        history.replaceChild(newText, history.childNodes[element + 1]);
        element++;
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
      // If the screen is requested to be cleared reset all the switches
      // and clear the documents history
      case "CE":
        ResetSwitches();
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
  return display1Value;
};

//// Sets all of the gate values to default states so nothing is confusing
let ResetSwitches = () => {
  display1.innerText = "0";
  display2.innerText = "0";
  display1Value = "";
  display2Value = "";
  Reset = true;
  SwitchOnce = true;
  let place1 = document.createTextNode("Data cleared");
  let place2 = document.createTextNode("");
  let place3 = document.createTextNode("");
  history.replaceChild(place1, history.childNodes[0]);
  history.replaceChild(place2, history.childNodes[1]);
  history.replaceChild(place3, history.childNodes[2]);
  element = 0;
};

//// On click method that gets fired every time the theme button is clicked
let ChangeTheme = () => {
  let className = themedcontainer.className;
  // Switch case here to determine which class to assign to the container to apply the new theme
  switch (className) {
    case "default-container":
      themedcontainer.className = "alternate-container";
      break;
    case "alternate-container":
      themedcontainer.className = "default-container";
      break;
  }
};

//// Posting a message each time the theme gets changed to confirm
let PostAMessage = () => {
  switch (revert) {
    case 0:
      // If the id already exists then remove it. There should only be one
      if (document.getElementById("volatilemessage")) {
        document.getElementById("volatilemessage").remove();
      }
      // Assign and instantiate a new element with an id for the confirmation message
      let casezero = document.createElement("h4");
      casezero.setAttribute("id", "volatilemessage");
      casezero.innerHTML = "The theme was changed.";
      document.querySelector(".volatile-message").appendChild(casezero);
      break;
    case 1:
      // Follow the same steps as above
      if (document.getElementById("volatilemessage")) {
        document.getElementById("volatilemessage").remove();
      }
      let caseone = document.createElement("h4");
      caseone.setAttribute("id", "volatilemessage");
      caseone.innerHTML = "The theme was changed back.";
      document.querySelector(".volatile-message").appendChild(caseone);
      break;
  }
};

// Keep count of how many times the theme is being cycled so it wont get stuck on the same one
let revert = 0;

// Event listener to keep the changes moving in a forward direction
themebutton.addEventListener("click", () => {
  // If there are more requests than there are themes, then just start over
  if (revert === 2) {
    revert = 0;
  }
  ChangeTheme();
  PostAMessage();
  revert++;
});
