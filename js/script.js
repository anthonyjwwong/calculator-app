let currentTotal = 0;
let buffer = "0";
let previousOperator;
const display = document.querySelector('.display p');


//function to handle button clicked
const buttonClicked = (value) => {
  (isNaN(parseInt(value))) ? handleSymbol(value) : handleNumber(value);
  render();
}

//ForEach button clicked, the eventlistener fires off.
[].forEach.call(document.querySelectorAll('button'), function(ele) {
  ele.addEventListener('click', function(e) {
    buttonClicked(e.target.innerText);
  })
});

//if buffer = "0", buffer equals to value clicked. if it's more than 0, it appends the number.
function handleNumber(value) {
  if (buffer.length <= 12) {
    buffer === "0" ? buffer = value : buffer += value;
  }
}


//different symbols.
function handleSymbol(value) {
  switch (value) {
    //if C, everything is nulled and reset
    case 'C':
      buffer = "0";
      currentTotal = 0;
      previousOperator = null;
      break;
    //if "=", operators +/=* will go into effect. Buffer will become the current total.
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + currentTotal;
      currentTotal = 0;
      break;
      //Backspace by 1.
     case "<-":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      //else just run whichever operator runs.
      handleMathOperator(value);
      break;
  }
}

function handleMathOperator(value) {
  //current display parsedInt.
  const bufferDisplay = parseInt(buffer);
  // if current total = 0, current total will be the current number on display.
  if (currentTotal === 0) {
    currentTotal = bufferDisplay;
  } else {
    //if not, run the operator.
    flushOperation(bufferDisplay);
  }
  previousOperator = value;

  buffer = "0";
}

//Operators function
function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    currentTotal += intBuffer;
  } else if (previousOperator === "-") {
    currentTotal -= intBuffer;
  } else if (previousOperator === "*") {
    currentTotal *= intBuffer;
  } else if (previousOperator === "/") {
    currentTotal /= intBuffer;
  }
}


//render function
function render() {

  display.innerText = buffer;
  display.innerText.length = 13;
}
