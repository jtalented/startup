document.addEventListener("DOMContentLoaded", function() {
    // Fetch recent prompts from the backend
    fetch('/api/prompts')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch recent prompts');
            }
            return response.json();
        })
        .then(data => {
            // Update the table with the fetched prompts
            const tableBody = document.querySelector("tbody");
            tableBody.innerHTML = ""; // Clear existing table content

            // Loop through each prompt and create table rows
            data.forEach(prompt => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${prompt.username}</td>
                    <td>${prompt.date}</td>
                    <td>${prompt.prompt}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching recent prompts:', error);
        });
});


// Function to check if user is logged in and redirect to index.html if not
function checkLoginStatus() {
    const loggedIn = localStorage.getItem('loggedIn');

    if (!loggedIn) {
        window.location.href = 'index.html';
    }
}

// Check login status when page is loaded
window.onload = checkLoginStatus;
