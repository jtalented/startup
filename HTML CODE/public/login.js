function login() {
    // Get the input values
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // Validate if username and password are not empty
    if (username.trim() === '' || password.trim() === '') {
        alert('Please enter both username and password');
        return;
    }

    // Store the username and password in local storage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Redirect the to play.html
    window.location.href = "play.html";
}


// Function to fetch and append random word to HTML
async function fetchAndAppendRandomWord() {
    try {
        // Make API call to fetch random word
        const response = await fetch('https://random-word.ryanrk.com/api/en/word/random');
        if (!response.ok) {
            throw new Error('Failed to fetch random word');
        }
        const data = await response.json();

        let randomWord;
        // Check if the response data is an array and has at least one word
        if (Array.isArray(data) && data.length > 0) {
            // Access the first word from the array
            randomWord = data[0];
        } else {
            // Use the word directly if it's not an array
            randomWord = data.word;
        }

        // Append the random word to the HTML
        const randomWordGenerator = document.querySelector('#random-word-generator');
        randomWordGenerator.textContent = `Random Word Generator: ${randomWord}`;
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch random word');
    }
}



// Call the function to fetch and append random word when the DOM content is loaded
document.addEventListener("DOMContentLoaded", fetchAndAppendRandomWord);