const body = document.querySelector('body');
const counter = document.createElement('div');
const minusBtn = document.createElement('div');
const plusBtn = document.createElement('div');
const valueWrapper = document.createElement('div');
const inputValue = document.createElement('input');

body.appendChild(counter);
counter.appendChild(minusBtn);
counter.appendChild(valueWrapper);
counter.appendChild(plusBtn);

valueWrapper.appendChild(inputValue);

counter.classList.add('counter-container');
minusBtn.classList.add('button');
plusBtn.classList.add('button');
valueWrapper.classList.add('value-wrapper');
inputValue.classList.add('value');

let count = 0;
let isAnimating = false;
inputValue.maxLength = 2;
inputValue.value = 0;
inputValue.textContent = count;
plusBtn.textContent = '+';
minusBtn.textContent = '-';

function animateSequentialChange(newValue, direction) {
    if (isAnimating) return;
    isAnimating = true;

    const outClass = direction === 'up' ? 'slide-out-up' : 'slide-out-down';
    const inClass = direction === 'up' ? 'slide-in-up' : 'slide-in-down';

    inputValue.classList.add(outClass);

    inputValue.addEventListener('animationend', function handleOut() {
        inputValue.classList.remove(outClass);
        inputValue.value = newValue;

        inputValue.classList.add(inClass);

        inputValue.addEventListener('animationend', function handleIn() {
            inputValue.classList.remove(inClass);
            isAnimating = false; 
        }, { once: true });

        inputValue.removeEventListener('animationend', handleOut);
    }, { once: true });
}

minusBtn.addEventListener('click', () => {
    if (count > 0 && !isAnimating) {
        animateSequentialChange(--count, 'up');
    }
});

plusBtn.addEventListener('click', () => {
    if (count < 99 && !isAnimating) {
        animateSequentialChange(++count, 'down');
    }
});