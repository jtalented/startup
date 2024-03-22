
// Function to check if user is logged in and redirect to index.html if not
function checkLoginStatus() {
    const loggedIn = localStorage.getItem('loggedIn');

    if (!loggedIn) {
        window.location.href = 'index.html';
    }
}

// Check login status when page is loaded
window.onload = checkLoginStatus;