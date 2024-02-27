document.addEventListener("DOMContentLoaded", function() {
    // get username
    const username = localStorage.getItem('username');

    // update first entry in table
    if (username) {
        const firstRow = document.querySelector("tbody tr:first-child");
        if (firstRow) {
            const cells = firstRow.querySelectorAll("td");
            if (cells.length >= 3) {
                // update first cell username
                cells[0].textContent = username;
            }
        }
    }





    
    // get current date
    const currentDate = new Date().toISOString().split('T')[0];

    // update table with current date
    const dateCell = document.querySelector("tbody tr:first-child td:nth-child(2)");
    if (dateCell) {
        dateCell.textContent = currentDate;
    }

    // Retrieve the madLibPrompt from local storage
    const madLibPrompt = localStorage.getItem('madLibPrompt');

    // update table with madLibPrompt if it exists
    const promptCell = document.querySelector("tbody tr:first-child td:nth-child(3)");
    if (promptCell && madLibPrompt) {
        promptCell.textContent = madLibPrompt;
    }
});
