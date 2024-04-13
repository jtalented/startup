import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './prompts.css'; // Import the CSS file

export function Prompts() {
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        fetchPrompts();
    }, []);

    const fetchPrompts = () => {
        fetch('/api/prompts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch recent prompts');
                }
                return response.json();
            })
            .then(data => {
                setPrompts(data);
            })
            .catch(error => {
                console.error('Error fetching recent prompts:', error);
            });
    };

    return (
        <div className="container" style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header>
                <img src="../words.jpg" alt="Word Icon" />
                <h1 style={{ color: '#fff' }}>MAD LIBS</h1>
                <nav>
                    <a href="/" style={{ color: '#ff00ff' }}>Home</a>
                    <a href="/prompts" style={{ color: '#ff00ff', marginLeft: '10px' }}>Recent Prompts</a>
                    <a href="/about" style={{ color: '#ff00ff', marginLeft: '10px' }}>About</a>
                </nav>
            </header>

            <section>
                <h2 style={{ color: '#fff' }}>Finished Mad Libs</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th style={{ color: '#fff' }}>Name</th>
                            <th style={{ color: '#fff' }}>Date</th>
                            <th style={{ color: '#fff' }}>Mad Lib Text (Will contain more text)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prompts.map((prompt, index) => (
                            <tr key={index}>
                                <td style={{ color: '#fff' }}>{prompt.username}</td>
                                <td style={{ color: '#fff' }}>{prompt.date}</td>
                                <td style={{ color: '#fff' }}>{prompt.prompt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <footer>
                <p>Author Jayden Allen</p>
                <p>Visit our GitHub repository: <a href="https://github.com/jtalented/startup.git" target="_blank">GITHUB</a></p>
            </footer>
        </div>
    );
}

export default Prompts;
