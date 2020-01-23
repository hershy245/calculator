
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};
//by default value 0
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
};
updateDisplay();

//the percent key
function percentKey(num, per) {
    return (num / 100 * per)
} //console.log(percentKey(15,25));


//update the value
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    } console.log(calculator);
}

//the decimal key
function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) return;
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}
//the AC operator
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function clear() {
    const { displayValue } = calculator;
    if (calculator.displayValue != 0) {
        calculator.displayValue = displayValue.toString().slice(0, -1);
    }
  if(calculator.displayValue==""){
      calculator.displayValue=0;
  }
}//console.log(clear(55));

//all operators
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](currentValue, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '%': (firstOperand, secondOperand) => percentKey(firstOperand, secondOperand),

    //  'ce':(firstOperand,secondOperand) => clear(firstOperand, secondOperand),

    '=': (firstOperand, secondOperand) => secondOperand
}
//respond to the click
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', function (y) {
    const target = y.target;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }// console.log(calculator);

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator()
        updateDisplay();
        return;
    }



    if (target.classList.contains('percent')) {
        percentKey()
        // console.log('percent', target.value);
        return;
    }

    if (target.classList.contains('clear')) {
        clear();
        updateDisplay();
        return;
    }


    inputDigit(target.value);
    updateDisplay();
});





