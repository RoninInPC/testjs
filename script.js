// Initialize Telegram WebApp
const tgApp = window.Telegram.WebApp;

// Expand the WebApp to full height
tgApp.expand();

// Set the main button color to match the theme
tgApp.MainButton.setParams({
    text: 'Отправить данные',
    color: tgApp.themeParams.button_color,
    text_color: tgApp.themeParams.button_text_color,
});

// Get the form element
const form = document.getElementById('application-form');
const submitButton = document.getElementById('submit-button');

// Function to collect form data
function collectFormData() {
    const formData = new FormData(form);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Collect form data
    const data = collectFormData();
    
    // Validate form data
    if (!validateForm(data)) {
        return;
    }
    
    // Send data back to the Telegram bot
    tgApp.sendData(JSON.stringify(data));
    
    // Close the WebApp after sending data
    tgApp.close();
});

// Form validation function
function validateForm(data) {
    // Check if name is provided
    if (!data.name || data.name.trim() === '') {
        alert('Пожалуйста, введите ваше имя');
        return false;
    }
    
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        alert('Пожалуйста, введите корректный email');
        return false;
    }
    
    // Check if phone is provided
    if (!data.phone || data.phone.trim() === '') {
        alert('Пожалуйста, введите номер телефона');
        return false;
    }
    
    return true;
}

// Show the main button when form is valid
form.addEventListener('input', function() {
    const data = collectFormData();
    if (validateForm(data)) {
        tgApp.MainButton.show();
    } else {
        tgApp.MainButton.hide();
    }
});

// Handle main button click
tgApp.MainButton.onClick(function() {
    submitButton.click();
});
