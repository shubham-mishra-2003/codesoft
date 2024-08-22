const display = document.getElementById("display");
const previousOperand = document.getElementById("previousOperand");
let firstOperand = "";
let secondOperand = "";
let operator = "";
let result = "";

document.querySelectorAll(".numberBtn").forEach(button => {
  button.addEventListener("click", function() {
    display.value += this.textContent;
  });
});

document
  .querySelectorAll(
    "#addBtn, #subtractBtn, #multiplyBtn, #divideBtn, #modulusBtn"
  )
  .forEach(button => {
    button.addEventListener("click", function() {
      if (display.value !== "") {
        firstOperand = display.value;
        operator = this.textContent;
        previousOperand.textContent = `${firstOperand} ${operator}`;
        display.value = "";
      }
    });
  });

document.getElementById("equalBtn").addEventListener("click", function() {
  if (operator && display.value !== "") {
    secondOperand = display.value;

    if (operator === "+") {
      result = parseFloat(firstOperand) + parseFloat(secondOperand);
    } else if (operator === "-") {
      result = parseFloat(firstOperand) - parseFloat(secondOperand);
    } else if (operator === "*") {
      result = parseFloat(firstOperand) * parseFloat(secondOperand);
    } else if (operator === "/") {
      if (secondOperand === "0") {
        result = "Error";
      } else {
        result = parseFloat(firstOperand) / parseFloat(secondOperand);
      }
    } else if (operator === "%") {
      result = parseFloat(firstOperand) % parseFloat(secondOperand);
    } else {
      result = "Invalid Operation";
    }

    display.value = result;
    previousOperand.textContent = "";
    firstOperand = result;
    operator = "";
  }
});

document.getElementById("eraseBtn").addEventListener("click", function() {
  display.value = display.value.slice(0, -1);
});

document.getElementById("clearBtn").addEventListener("click", function() {
  display.value = "";
  previousOperand.textContent = "";
  firstOperand = "";
  secondOperand = "";
  operator = "";
  result = "";
});

document.getElementById("decimalBtn").addEventListener("click", function() {
  if (!display.value.includes(".")) {
    display.value += ".";
  }
});
