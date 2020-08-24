const displayScreen = document.querySelector('.display');
const numberBtns = document.querySelectorAll('.numberBtn');
const operatorBtns = document.querySelectorAll('.operatorBtn');
const acBtn = document.querySelector('.clear')
const backspaceBtn = document.querySelector('.backspace');
const decimalBtn = document.querySelector('.decimal');
const equalBtn = document.querySelector('.equal');

const add = (num1, num2) => {return num1 + num2};
const subtract = (num1, num2) => {return num1 - num2};
const multiply = (num1, num2) => {return num1 * num2};
const divide = (num1, num2) => {
    if (num2 === '0' || 0) {
        alert('Dividing by zero is not possible! It is not a number.');
    } else {
    return num1 / num2;
    }
};

const operate = (operation, num1, num2) => {
    let operationResult = 0;
    switch(operation) {
        case 'add':
            operationResult = add(num1, num2);
            break;
        case 'subtract':
            operationResult = subtract(num1, num2);
            break;
        case 'multiply':
            operationResult = multiply(num1, num2);
            break;
        case 'divide':
            operationResult = divide(num1, num2);
            break;
        default:
            alert('Operation not possible!');
    }
    if(!operationResult) {
        clear();
        return;
    }
    operationResult = Math.min(operationResult, 999999999999);
    displayValue = operationResult;
    nextOperation = '';
    updateScreen();
};

const numInput = (num) => {
    displayValue += num.toString();
    displayValue = Number(displayValue);
    updateScreen();
}
  
const updateScreen = (value) => {
    if (displayValue.toString().length > 12) {
      displayValue = Number(displayValue.toString().slice(0, 12));
    }
    displayScreen.textContent = displayValue;
}

const clear = () => {
    previousValue = 0;
    displayValue = 0;
    nextOperation = '';
    updateScreen();
}

const backspace = () => {
    let newValue = displayValue.toString();
    newValue = newValue.slice(0, newValue.length-1);
    if (newValue === '') {
        newValue = 0;
    }
    displayValue = Number(newValue);
    updateScreen();
}

const addDecimal = () => {
    let newValue = displayValue + '.';
    if (isNaN(newValue)) {
        newValue = displayValue;
    }
    displayValue = newValue;
    updateScreen();
}

numberBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        numInput(btn.dataset.value);
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        if (nextOperation) {
            operate(nextOperation, previousValue, displayValue);
        }
        nextOperation = btn.dataset.value;
        previousValue = displayValue;
        displayValue = 0;
    });
});

acBtn.addEventListener('click', e => {
    clear();
});

backspaceBtn.addEventListener('click', e => {
    backspace();
});

decimalBtn.addEventListener('click', e => {
    addDecimal();
});

equalBtn.addEventListener('click', e => {
    if (nextOperation) {
        if (displayValue !== 0) operate(nextOperation, previousValue, displayValue);
    };
});

let previousValue = 0;
let displayValue = 0;
let nextOperation = '';

updateScreen();