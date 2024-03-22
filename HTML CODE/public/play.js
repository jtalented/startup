document.addEventListener("DOMContentLoaded", function() {
    // get username
    const username = localStorage.getItem('username');

    // If username is null, set it to "Anonymous"
    if (!username) {
        username = "Anonymous";
        localStorage.setItem('username', username); // Save to localStorage
    }

    // update label with username
    const usernameLabel = document.querySelector('.game-connected');
    usernameLabel.textContent = username;

    // Add listener to the Save/Submit button
    document.getElementById("saveSubmitButton").addEventListener("click", function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get values from text boxes
        const txt1 = document.getElementById("txt1").value;
        const txt2 = document.getElementById("txt2").value;
        const txt3 = document.getElementById("txt3").value;
        const txt4 = document.getElementById("txt4").value;
        const txt5 = document.getElementById("txt5").value;
        const txt6 = document.getElementById("txt6").value;
        const txt7 = document.getElementById("txt7").value;
        const txt8 = document.getElementById("txt8").value;
        const txt9 = document.getElementById("txt9").value;
        const txt10 = document.getElementById("txt10").value;
        const txt11 = document.getElementById("txt11").value;
        const txt12 = document.getElementById("txt12").value;

        // Check if all text boxes are filled
        if (txt1 && txt2 && txt3 && txt4 && txt5 && txt6 && txt7 && txt8 && txt9 && txt10 && txt11 && txt12) {



            // Generate the prompt with filled-in values
            const prompt = generatePrompt(txt1, txt2, txt3, txt4, txt5, txt6, txt7, txt8, txt9, txt10, txt11, txt12);


            // Display the prompt
            const storyTextArea = document.getElementById("story");
            storyTextArea.value = prompt;

            // Save the prompt to local storage
            localStorage.setItem('madLibPrompt', prompt);
            // Save the prompt to the backend
            savePromptToBackend(username, prompt);

            // Clear text boxes
            clearTextBoxes();
        } else {
            // Display an error message if any text box is empty
            alert("Please fill in all the text boxes.");
        }

    });

    // allow only numbers and letters
    const textInputs = document.querySelectorAll("input[type='text']");
    textInputs.forEach(function(input) {
        input.addEventListener("input", function(event) {
            const value = event.target.value;
            // Replace any character that is not a number or letter with an empty string
            event.target.value = value.replace(/[^a-zA-Z0-9]/g, '');
        });
    });


    // Add event listener to the download button
    const downloadButton = document.querySelector(".results-container button");
    downloadButton.addEventListener("click", function() {
        // Get the prompt from the textarea
        const prompt = document.getElementById("story").value;

        // Check if the prompt is not empty
        if (prompt.trim() !== "") {
            // Create a Blob containing the prompt text
            const blob = new Blob([prompt], { type: "text/plain" });

            // Create a temporary anchor element to trigger the download
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "mad_lib_prompt.txt";

            // Append the anchor to the document body and trigger the download
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            // Display an error message if the prompt is empty
            alert("The prompt is empty. Please generate a prompt before downloading.");
        }
    });

// Add event listener to the "Email" button
document.getElementById("emailButton").addEventListener("click", function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Prompt the user for their email address
    const userEmail = prompt("Please enter your email address:");

    // Check if the user entered an email address
    if (userEmail) {
        // Get the prompt from the textarea
        const prompt = document.getElementById("story").value;

        // Check if the prompt is not empty
        if (prompt.trim() !== "") {
            // Send email
            sendEmail(userEmail, prompt);
        } else {
            // Display an error message if the prompt is empty
            alert("The prompt is empty. Please generate a prompt before sending the email.");
        }
    } else {
        // Display an error message if the user cancels the prompt
        alert("Email address not provided. Please enter your email address to send the email.");
    }
});


});

// Function to generate the prompt with filled-in values
function generatePrompt(txt1, txt2, txt3, txt4, txt5, txt6, txt7, txt8, txt9, txt10, txt11, txt12) {
    // Generate the prompt with filled-in values *****************************************************this will need updated once database is accessed
    const prompt = `In a ${txt1} far, far away, a(n) ${txt2} traveler embarked on a journey ${txt3}. Along the way, they encountered a ${txt4} of ${txt5} mysteries. Together, they ${txt6} through the ${txt7} landscape, feeling ${txt8} and ${txt9} at every turn. Eventually, they reached their destination, only to find themselves ${txt10} by the very thing they sought to ${txt11}. In the end, they realized that the true truth lay within themselves, waiting to be ${txt12} and shared to the world.`;

    return prompt;
}

// Function to clear text boxes after successful submission
function clearTextBoxes() {
    const textInputs = document.querySelectorAll("input[type='text']");
    textInputs.forEach(function(input) {
        input.value = '';
    });
}



// Function to send email
function sendEmail(email, prompt) {
    // Define email data
    const emailData = {
        to: email,
        subject: 'Mad Libs Prompt',
        body: prompt
    };

    // Send email data to the server
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
    .then(response => {
        if (response.ok) {
            alert('Email sent successfully');
        } else {
            throw new Error('Failed to send email');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send email');
    });
}

// Function to save the prompt to the backend
function savePromptToBackend(username, prompt) {
    // Get the current date
    const currentDate = formatDate(new Date());

    // Define data to be sent to the server
    const postData = {
        username: username,
        date: currentDate,
        prompt: prompt
    };

    // Log postData to console
    console.log('POST Data:', postData);

    // Make a POST request to save the prompt to the backend
    fetch('/api/submitPrompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (response.ok) {
            clearTextBoxes();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



// Function to format the date as DD/MM/YYYY
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


// Function to check if user is logged in and redirect to index.html if not
function checkLoginStatus() {
    const loggedIn = localStorage.getItem('loggedIn');

    if (!loggedIn) {
        window.location.href = 'index.html';
    }
}

// Check login status when page is loaded
window.onload = checkLoginStatus;