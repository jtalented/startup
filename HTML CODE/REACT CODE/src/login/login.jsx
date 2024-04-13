import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Import the CSS file

export function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    // Check login status when the component mounts
    useEffect(() => {
        checkLoginStatus();
        fetchAndAppendRandomWord();
    }, []);

    const handleLogin = async () => {
        if (username.trim() === '' || password.trim() === '') {
            alert('Please enter both username and password');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            });

            if (response.ok) {
                const data = await response.json();
                const isNewUser = data.newUser;
                if (isNewUser) {
                    alert(`Welcome, ${username}! You are a new user.`);
                } else {
                    alert(`Welcome back, ${username}!`);
                }

                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', username);

                setLoggedIn(true); // Update loggedIn state
            } else {
                const body = await response.json();
                const errorMessage = body.error || 'Login failed';
                alert(`Login failed: ${errorMessage}`);
            }
        } catch (error) {
            alert('Failed to login');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        setLoggedIn(false); // Update loggedIn state
    };

    const checkLoginStatus = () => {
        const loggedInStatus = localStorage.getItem('loggedIn');
        setLoggedIn(loggedInStatus === 'true'); // Convert to boolean value
    };

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

    return (
        <div className="container"  style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}> 
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

            <section id="loginSection" className="input-field" style={{ marginBottom: '20px', textAlign: 'center' }}>
                {loggedIn ? (
                    // Display buttons if logged in
                    <div id="playSection">
                        <button className="btn btn-primary" onClick={() => navigate('/play')}>Play</button>
                        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    // Display login form if not logged in
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <label htmlFor="username" style={{ color: '#fff', marginBottom: '10px' }}>Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Enter username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                            style={{ marginBottom: '10px' }}
                        />

                        <label htmlFor="password" style={{ color: '#fff', marginBottom: '10px' }}>Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            style={{ marginBottom: '10px' }}
                        />

                        <button type="button" className="btn btn-primary" onClick={handleLogin} style={{ marginBottom: '10px' }}>Login</button>
                    </form>
                )}
            </section>

            <section style={{ marginBottom: '20px', textAlign: 'center' }}>
                <p id="random-word-generator" style={{ color: '#7FFFD4', marginBottom: '10px' }}>Random Word Generator:</p>
                <p style={{ color: '#fff', marginBottom: '10px' }}>Author Jayden Allen</p>
                <p style={{ color: '#ffff00', marginBottom: '10px' }}>Visit our GitHub repository: <a href="https://github.com/jtalented/startup.git" target="_blank">GITHUB</a></p>
            </section>
        </div>
    );
}

export default Login;
