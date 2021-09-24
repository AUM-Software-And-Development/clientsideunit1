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
  { id: "EqualSwitch", status: false, symbol: "=" },
  { id: "PlusSwitch", status: false, symbol: "+" },
  { id: "MinusSwitch", status: false, symbol: "-" },
  { id: "TimesSwitch", status: false, symbol: "X" },
  { id: "DivideSwitch", status: false, symbol: "/" },
  { id: "ModuloSwitch", status: false, symbol: "%" },
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
        var id = GetCurrentOperation();
        console.log(id);
        let calculatedValue = CalculateValue(id);
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

function GetCurrentOperation() {
  var flag;
  Operations.forEach((operation) => {
    if (operation.status) {
      console.log(operation);
      flag = operation.id;
    }
  });
  return flag;
}

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
