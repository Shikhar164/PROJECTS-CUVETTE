let display = document.getElementById('display');

function appendNumber(number) {
    if (display.innerText === '0') {
        display.innerText = number;
    } else {
        display.innerText += number;
    }
}

function appendOperator(operator) {
    const lastChar = display.innerText[display.innerText.length - 1];
    if (!['+', '-', '*', '/'].includes(lastChar)) {
        display.innerText += operator;
    }
}

function deleteLast() {
    display.innerText = display.innerText.slice(0, -1) || '0';
}

function clearDisplay() {
    display.innerText = '0';
}

function calculateResult() {
    try {
        display.innerText = eval(display.innerText.replace(/x/g, '*'));
    } catch {
        display.innerText = 'Error';
    }
}