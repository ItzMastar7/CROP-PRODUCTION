// Define the correct order of steps
const steps = [
    "Preparation of Soil",
    "Sowing",
    "Adding Manure and Fertilizers",
    "Irrigation",
    "Protection from Weeds",
    "Harvesting",
    "Storage"
];

// Explanations for each step (based on NCERT Grade 8)
const stepExplanations = {
    "Preparation of Soil": "Preparation of soil involves loosening and turning it to help roots penetrate easily, and it improves air circulation and nutrient absorption.",
    "Sowing": "Sowing is placing seeds into the soil. Choosing good quality seeds and maintaining proper depth is essential for healthy crop growth.",
    "Adding Manure and Fertilizers": "Adding manure and fertilizers provides essential nutrients to the soil, ensuring healthy crop production.",
    "Irrigation": "Irrigation is the process of supplying water to crops at regular intervals for their growth.",
    "Protection from Weeds": "Protecting crops from weeds is important as weeds compete with crops for nutrients, water, and sunlight.",
    "Harvesting": "Harvesting is the process of cutting mature crops. Proper timing is essential to avoid losses.",
    "Storage": "Storage is crucial for protecting the harvested crop from pests and moisture to ensure a good supply throughout the year."
};

// Track the current correct step
let currentStepIndex = 0;

// Function to initialize and shuffle the steps
function initializeSteps() {
    const stepsContainer = document.getElementById('steps');

    // Shuffle the steps randomly and create elements for each
    const shuffledSteps = [...steps].sort(() => Math.random() - 0.5);
    shuffledSteps.forEach(step => {
        const stepElement = document.createElement('div');
        stepElement.textContent = step;
        stepElement.classList.add('step');
        stepElement.setAttribute('draggable', true);
        stepElement.addEventListener('dragstart', dragStart);
        stepElement.addEventListener('click', () => showPopup(step)); // Show popup on click
        stepsContainer.appendChild(stepElement);
    });
}

// Drag-and-drop event functions
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.textContent);
}

function dragOver(event) {
    event.preventDefault(); // Allow the drop
}

function drop(event) {
    event.preventDefault();
    const droppedStep = event.dataTransfer.getData("text");

    // Check if the dropped step is in the correct order
    if (droppedStep === steps[currentStepIndex]) {
        displayMessage(`Correct! ${droppedStep} is in the right order.`);
        addStepToSequence(droppedStep);
        currentStepIndex++;
        
        // Check if all steps are correctly placed
        if (currentStepIndex === steps.length) {
            displayFinalMessage();
        }
    } else {
        displayMessage(`Incorrect! ${droppedStep} is out of order.`);
    }
}

// Add the correctly ordered step to the sequence area
function addStepToSequence(step) {
    const newStep = document.createElement('div');
    newStep.textContent = step;
    newStep.classList.add('step');
    document.getElementById('dropArea').appendChild(newStep);
}

// Display a message in the message box
function displayMessage(message) {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
}

// Display a final message when all steps are arranged correctly
function displayFinalMessage() {
    displayMessage("Congratulations! You've arranged all steps correctly.");
}

// Show a popup with the explanation of the clicked step
function showPopup(step) {
    const popup = document.getElementById('popup');
    popup.textContent = stepExplanations[step];
    popup.style.display = 'block';
}

// Hide the popup when clicked outside
document.addEventListener('click', function(event) {
    const popup = document.getElementById('popup');
    if (event.target.className !== 'step' && event.target.id !== 'popup') {
        popup.style.display = 'none';
    }
});

// Add event listeners for the drop area
const dropArea = document.getElementById('dropArea');
dropArea.addEventListener('dragover', dragOver);
dropArea.addEventListener('drop', drop);

// Initialize the game
initializeSteps();
