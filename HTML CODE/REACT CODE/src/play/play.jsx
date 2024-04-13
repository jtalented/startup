import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './play.css'; // Import the CSS file



// Move the socket declaration outside the component
let socket;

export function Play() {

    
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [madLibPrompt, setMadLibPrompt] = useState('');

    useEffect(() => {
        checkLoginStatus();
        loadUsername();
        initializeWebSocket();
    }, []);

    const initializeWebSocket = () => {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        socket.onopen = () => {
            console.log('WebSocket connected');
            sendWebSocketMessage(`Another player is now creating Mad Libs`);
        };

        socket.onmessage = (event) => {
            const messagesDiv = document.getElementById("websocket-messages");
            const messageParagraph = document.createElement("p");
            messageParagraph.textContent = event.data;
            messagesDiv.appendChild(messageParagraph);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket closed');
            sendWebSocketMessage(`${username} left`);
        };
    };

    const sendWebSocketMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        }
    };

    const checkLoginStatus = () => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (!loggedIn) {
            // Redirect to login page if not logged in
            navigate('/login');
        }
    };

    const loadUsername = () => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            setUsername('Anonymous');
        }
    };

    const generatePrompt = () => {
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
            const prompt = `In a ${txt1} far, far away, a(n) ${txt2} traveler embarked on a journey ${txt3}. Along the way, they encountered a ${txt4} of ${txt5} mysteries. Together, they ${txt6} through the ${txt7} landscape, feeling ${txt8} and ${txt9} at every turn. Eventually, they reached their destination, only to find themselves ${txt10} by the very thing they sought to ${txt11}. In the end, they realized that the true truth lay within themselves, waiting to be ${txt12} and shared to the world.`;

            // Display the prompt
            setMadLibPrompt(prompt);

            // Save the prompt to local storage
            localStorage.setItem('madLibPrompt', prompt);

            // Save the prompt to the backend
            savePromptToBackend(prompt, username);

            // Send WebSocket message
            sendWebSocketMessage(`${username} submitted a prompt`);
        } else {
            // Display an error message if any text box is empty
            alert("Please fill in all the text boxes.");
        }
    };

    const savePromptToBackend = (prompt, username) => {
        const currentDate = formatDate(new Date());
        // Define data to be sent to the server
        const postData = {
            username: username,
            date: currentDate,
            prompt: prompt
        };

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
    };

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const clearTextBoxes = () => {
        const textInputs = document.querySelectorAll("input[type='text']");
        textInputs.forEach(function(input) {
            input.value = '';
        });
    };

    const handleDownload = () => {
        // Check if the prompt is not empty
        if (madLibPrompt.trim() !== "") {
            // Create a Blob containing the prompt text
            const blob = new Blob([madLibPrompt], { type: "text/plain" });

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
    };


    return (
        <div className="container" style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header>
                <div className="top-banner" style={{ backgroundColor: '#333', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <img src="/pencil.png" alt="Pencil Icon" style={{ height: '64px', marginRight: '8px' }} />
                        <h1 style={{ color: '#fff', margin: 0 }}>MAD LIBS</h1>
                    </div>
                    <nav>
                        <a href="/" style={{ color: '#ff00ff' }}>Home</a>
                        <a href="/prompts" style={{ color: '#ff00ff', marginLeft: '10px' }}>Recent Prompts</a>
                        <a href="/about" style={{ color: '#ff00ff', marginLeft: '10px' }}>About</a>
                    </nav>
                </div>

                <p style={{ color: '#fff', marginBottom: '10px' }}>{username} <span className="game-connected">Game Connected</span></p>
            </header>

            <main>
            <div className="form-container" style={{ textAlign: 'center' }}>
                <label htmlFor="txt1" style={{ color: '#fff' }}>Noun:</label>
                <input type="text" id="txt1" name="txt1" required />

                <label htmlFor="txt2" style={{ color: '#fff' }}>Adjective:</label>
                <input type="text" id="txt2" name="txt2" required />

                <label htmlFor="txt3" style={{ color: '#fff' }}>Noun:</label>
                <input type="text" id="txt3" name="txt3" required />

                <label htmlFor="txt4" style={{ color: '#fff' }}>Adverb:</label>
                <input type="text" id="txt4" name="txt4" required />

                <label htmlFor="txt5" style={{ color: '#fff' }}>Adjective:</label>
                <input type="text" id="txt5" name="txt5" required />

                <label htmlFor="txt6" style={{ color: '#fff' }}>Noun:</label>
                <input type="text" id="txt6" name="txt6" required />

                {/* New input fields */}
                <label htmlFor="txt7" style={{ color: '#fff' }}>Verb:</label>
                <input type="text" id="txt7" name="txt7" required />

                <label htmlFor="txt8" style={{ color: '#fff' }}>Color:</label>
                <input type="text" id="txt8" name="txt8" required />

                <label htmlFor="txt9" style={{ color: '#fff' }}>Adjective:</label>
                <input type="text" id="txt9" name="txt9" required />

                <label htmlFor="txt10" style={{ color: '#fff' }}>Adverb:</label>
                <input type="text" id="txt10" name="txt10" required />

                <label htmlFor="txt11" style={{ color: '#fff' }}>Noun:</label>
                <input type="text" id="txt11" name="txt11" required />

                <label htmlFor="txt12" style={{ color: '#fff' }}>Verb:</label>
                <input type="text" id="txt12" name="txt12" required />

                <button id="saveSubmitButton" onClick={generatePrompt} style={{ marginTop: '20px' }}>Save/Submit</button>
            </div>


                <div className="results-container" style={{ textAlign: 'center' }}>
                    <div style={{ color: '#fff', marginBottom: '10px' }}>Mad Lib Prompt</div>
                    <textarea id="story" name="story" rows="8" cols="50" placeholder="" value={madLibPrompt} readOnly />
                    <button onClick={handleDownload} style={{ marginBottom: '10px' }}>Download</button>
                </div>
            </main>

            <footer style={{ textAlign: 'center' }}>
                {/*<button>Generate New Prompt</button>*/}
                <a href="/prompts">View Recent Submissions</a>
            </footer>

            <div id="websocket-messages"></div>
        </div>
    );
}

export default Play;
