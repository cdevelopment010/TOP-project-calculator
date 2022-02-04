let btns = document.querySelectorAll(".key");
let equation = document.querySelector(".equation");
let result = document.querySelector(".result");

let currentString = "";
let currentResult = 0;

document.addEventListener("keydown", function (e) {
  //array of acceptable keydowns
  let keys = ["Escape", "Backspace", "Enter", "+", "/", "*", "-", "=", "."];
  for (let i = 0; i <= 9; i++) {
    keys.push(String(i));
  }
  if (keys.includes(e.key)) {
    let item = {
      innerText: e.key,
      id: e.key,
    };
    populateKeyOrBtn(item);
  }
});

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    let item = btn;
    populateKeyOrBtn(item);
  });
});

function populateKeyOrBtn(item) {
  // if two operators are pressed in a row, replace with newest operator
  if (
    ["+", "-", "*", "/"].indexOf(currentString[currentString.length - 1]) !=
      -1 &&
    ["+", "-", "*", "/"].indexOf(item.innerText) != -1
  ) {
    if (currentString[currentString.length - 1] == item.innerText) {
      return;
    } else {
      currentString = currentString.split("").slice(0, -1).join("");
    }
  }

  if (
    item.id != "equals" &&
    item.id != "clear" &&
    item.id != "backspace" &&
    item.id != "=" &&
    item.id != "Enter" &&
    item.id != "Escape" &&
    item.id != "Backspace"
  ) {
    console.log(item);
    btnPress(item);
  }

  if (item.id == "clear" || item.id == "Escape") {
    clear();
  }

  if (item.id == "backspace" || item.id == "Backspace") {
    backspace();
  }

  if (item.id == "equals" || item.id == "=" || item.id == "Enter") {
    calculate();
  }

  let regex = /\+|\-|\*|\//g;
  let operatorCount = currentString.match(regex);
  if (operatorCount && operatorCount.length > 1) {
    calculateTwoOperators();
  }
}

function operator(op, a, b, additionalStr = "") {
  // Round to 5 decimal places
  currentResult = Math.round(op(a, b) * 100000) / 100000;
  equation.innerText = currentString;
  currentString = currentResult + additionalStr;
  result.innerText = currentResult;
}

function add(a, b) {
  currentString = `${a} + ${b}`;
  return Number(a) + Number(b);
}

function subtract(a, b) {
  currentString = `${a} - ${b}`;
  return a - b;
}
function multiply(a, b) {
  currentString = `${a} * ${b}`;
  return a * b;
}
function divide(a, b) {
  if (b == 0) {
    currentString = "Division by zero, try again.";
    return 0;
  }
  currentString = `${a} / ${b}`;
  return a / b;
}

function btnPress(btn) {
  currentString += btn.innerText;
  result.innerText = currentString;
}

function clear() {
  currentString = "";
  currentResult = 0;
  result.innerText = "";
  equation.innerText = "";
}

function backspace() {
  currentString = currentString.split("").slice(0, -1).join("");
  result.innerText = currentString;
}

function calculateTwoOperators() {
  let regex = /\+|\-|\*|\//g;
  let numbers = currentString.split(regex).slice(0, -1);
  let op1 = currentString.match(regex)[0];
  let op2 = currentString.match(regex)[1];
  console.log(numbers);
  console.log(op2);

  switch (op1) {
    case "+":
      return operator(add, Number(numbers[0]), Number(numbers[1]), op2);
    case "-":
      return operator(subtract, Number(numbers[0]), Number(numbers[1]), op2);
    case "*":
      return operator(multiply, Number(numbers[0]), Number(numbers[1]), op2);
    case "/":
      return operator(divide, Number(numbers[0]), Number(numbers[1]), op2);
    default:
      return console.log("error");
  }
}

function calculate() {
  let regex = /\+|\-|\*|\//g;
  let numbers = currentString.split(regex);
  let op1 = currentString.match(regex)[0];
  console.log(numbers);

  switch (op1) {
    case "+":
      return operator(add, Number(numbers[0]), Number(numbers[1]));
    case "-":
      return operator(subtract, Number(numbers[0]), Number(numbers[1]));
    case "*":
      return operator(multiply, Number(numbers[0]), Number(numbers[1]));
    case "/":
      return operator(divide, Number(numbers[0]), Number(numbers[1]));
    default:
      return console.log("error");
  }
}
