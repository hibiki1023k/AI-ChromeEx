// Create a dialog-style UI
const dialog = document.createElement('div');
dialog.style.position = 'fixed';
dialog.style.top = '50%';
dialog.style.left = '50%';
dialog.style.transform = 'translate(-50%, -50%)';
dialog.style.backgroundColor = 'white';
dialog.style.padding = '20px';
dialog.style.border = '1px solid black';
dialog.style.zIndex = '9999';
document.body.appendChild(dialog);

// Create an input field
const input = document.createElement('input');
input.type = 'text';
input.style.marginBottom = '10px';
dialog.appendChild(input);

// Create a button
const button = document.createElement('button');
button.textContent = 'Submit';
dialog.appendChild(button);

// Handle button click event
button.addEventListener('click', () => {
  const userInput = input.value;
  alert(userInput); // Echo back user input
});

// Hide the dialog initially
dialog.style.display = 'none';

// Show the dialog when a specific key combination is pressed
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey && event.key === 'D') {
    dialog.style.display = 'block';
    input.focus();
  }
});
