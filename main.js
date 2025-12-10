// Get DOM elements
const minInput = document.getElementById('minInput');
const maxInput = document.getElementById('maxInput');
const generateBtn = document.getElementById('generateBtn');
const output = document.getElementById('output');
const presetBtns = document.querySelectorAll('.preset-btn');

// Function to generate random number
function generateRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to display the generated number with animation
function displayNumber(min, max) {
    const randomNum = generateRandomNumber(min, max);
    
    // Animation parameters
    const targetDuration = 150; // milliseconds for the entire animation
    let currentNum = parseInt(output.textContent) || 0;
    const distance = Math.abs(randomNum - currentNum);
    const updateFrequency = targetDuration / distance; // proportional timing
    
    const animate = () => {
        if (currentNum !== randomNum) {
            // Increment or decrement by 1 towards the target
            if (currentNum < randomNum) {
                currentNum++;
            } else {
                currentNum--;
            }
            output.textContent = currentNum;
            setTimeout(animate, updateFrequency);
        } else {
            // Animation complete, display final number
            output.textContent = randomNum;
        }
    };
    
    animate();
}

// Generate button click handler
generateBtn.addEventListener('click', () => {
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);
    
    if (isNaN(min) || isNaN(max)) {
        alert('Please enter valid numbers');
        return;
    }
    
    if (min > max) {
        alert('Minimum value must be less than or equal to maximum value');
        return;
    }
    
    displayNumber(min, max);
});

// Preset buttons click handler
presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const min = parseInt(btn.dataset.min);
        const max = parseInt(btn.dataset.max);
        
        // Update input fields
        minInput.value = min;
        maxInput.value = max;
        
        // Generate and display the number
        displayNumber(min, max);
    });
});
