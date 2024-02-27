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
