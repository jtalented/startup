async function login() {
    // Get the input values
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    // Validate if username and password are not empty
    if (username.trim() === '' || password.trim() === '') {
        alert('Please enter both username and password');
        return;
    }

    try {
        // Make a POST request to the server for login
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        });

        // If login is successful
        if (response.ok) {
            // Show welcome message based on whether it's a new user or returning user
            const data = await response.json();
            const isNewUser = data.newUser;
            if (isNewUser) {
                alert(`Welcome, ${username}! You are a new user.`);
            } else {
                alert(`Welcome back, ${username}!`);
            }

            // Set logged in status and username in local storage
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);
            
            // Redirect to play.html
            window.location.href = "play.html";
        } else {
            // If login fails, show error message
            const body = await response.json();
            const errorMessage = body.error || 'Login failed';
            alert(`Login failed: ${errorMessage}`);
        }
    } catch (error) {
        alert('Failed to login');
    }
}

// Function to check if user is logged in and adjust UI accordingly
function checkLoginStatus() {
    const loggedIn = localStorage.getItem('loggedIn');
    const loginSection = document.getElementById('loginSection');
    const playSection = document.getElementById('playSection');

    if (loggedIn) {
        // User is logged in, show play/logout section and hide login section
        loginSection.style.display = 'none';
        playSection.style.display = 'block';
    } else {
        // User is not logged in, show login section and hide play/logout section
        loginSection.style.display = 'block';
        playSection.style.display = 'none';
    }
}

// Function to log out the user
function logout() {
    // Remove the logged in status and username from local storage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    // Redirect to index.html to reload
    window.location.href = "index.html";
}



// Check login status when page is loaded
window.onload = checkLoginStatus;
