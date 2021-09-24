const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");
const temporaryResult = document.querySelector(".temp-result");
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

numbersElement.forEach((number) => {
  number.addEventListener("click", (e) => {
    let value = e.target.innerText;
    console.log(value);
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

let Operations = [
  { id: "EqualSwitch", status: false },
  { id: "PlusSwitch", status: false },
  { id: "MinusSwitch", status: false },
  { id: "TimesSwitch", status: false },
  { id: "DivideSwitch", status: false },
  { id: "ModuloSwitch", status: false },
];

operationElement.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    let key = e.target.innerText;
    console.log(key);
    switch (key) {
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
      case "=":
        OnOperationClick("EqualSwitch");
        break;
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
    }
  });
});

let OnOperationClick = (caller) => {
  Operations.forEach((operation) => {
    if (operation.id === caller) {
      operation.status = true;
    } else {
      operation.status = false;
    }
  });
  console.log(Operations);
};
