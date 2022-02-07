let btns = document.querySelectorAll(".key");
let equation = document.querySelector(".equation");
let result = document.querySelector(".result");
let currentString = "";
let currentResult = 0;
let regex = /\+|\-|\*|\//g;

document.addEventListener("keydown", function (e) {
  //array of acceptable keydowns
  let keys = ["Escape", "Backspace", "Enter", "+", "/", "*", "-", "=", "."];
  for (let i = 0; i <= 9; i++) {
    keys.push(String(i));
  }
  if (keys.includes(e.key)) {
    // set up an object with id/innertext to replicate btns propeties
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
  // this means you can't multiply by -1 
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
    btnPress(item);
  }

  if (item.id == "clear" || item.id == "Escape") {
    clear();
    return; 
  }

  if (item.id == "backspace" || item.id == "Backspace") {
    backspace();
  }

  if (item.id == "equals" || item.id == "=" || item.id == "Enter") {
    calculate();
    return;
  }

  if (currentString.length > 0){
    let firstCharNeg = currentString[0].match(regex); 
    let operatorCount = currentString.match(regex);
    if ((operatorCount && operatorCount.length > 1 && firstCharNeg == null) || (operatorCount && operatorCount.length > 2 && firstCharNeg.length == 1)) {
      calculate();
    }
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

function calculate() {
  let numbers = currentString.split(regex);
  let totalOps = currentString.match(regex); 
  let num1 = numbers[0] == '' ? totalOps[0] + numbers[1] : numbers[0]; 
  let num2 = numbers[0] == '' && numbers.length == 3 ? numbers[2] 
              : numbers[0] == ''? 0 : numbers[1];
  let op1 = numbers.length == 3 && totalOps.length >= 2 ? totalOps[1] : totalOps[0];
  let op2 = numbers.length == 3 && totalOps.length >= 2 ? totalOps[2] : totalOps[1];

  // console.log('numbers',numbers);
  // console.log('totalOps',totalOps);
  // console.log('num1',num1);
  // console.log('num2',num2);
  // console.log('op1',op1);
  // console.log('op2',op2);

  switch (op1) {
    case "+":
      return operator(add, Number(num1), Number(num2), op2);
    case "-":
      return operator(subtract, Number(num1), Number(num2), op2);
    case "*":
      return operator(multiply, Number(num1), Number(num2), op2);
    case "/":
      return operator(divide, Number(num1), Number(num2), op2);
    default:
      return console.log("error");
  }
}
