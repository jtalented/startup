import React, { useEffect } from 'react';
import './about.css'; // Import the CSS file

export function About() {
    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = () => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (!loggedIn) {
            // Redirect to login page if not logged in
            window.location.href = '/login';
        }
    };

    return (
        <div className="container" style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header>
                <img src="/words.jpg" alt="Word Icon" />
                <h1 style={{ color: '#fff' }}>MAD LIBS</h1>
                <nav>
                    <a href="/" style={{ color: '#ff00ff' }}>Home</a>
                    <a href="/prompts" style={{ color: '#ff00ff', marginLeft: '10px' }}>Recent Prompts</a>
                    <a href="/about" style={{ color: '#ff00ff', marginLeft: '10px' }}>About</a>
                </nav>
            </header>

            <hr className="hr-spacing" />

            <section>
                <h2 style={{ color: '#7FFFD4' }}>Website Purpose</h2>
                <p>This website is created for educational purposes, providing a platform to explore and play with the concept of Mad Libs.</p>

                <h2 style={{ color: '#7FFFD4' }}>Citation</h2>
                <p>Mad Libs is a registered trademark of Penguin Random House LLC. The concept was created by Leonard Stern and Roger Price in 1953. For more information, visit the official Mad Libs website: <a href="https://www.madlibs.com/" target="_blank" rel="noopener noreferrer">Mad Libs</a>.</p>
            </section>

            <footer>
                <p>Author Jayden Allen</p>
                <p>Visit our GitHub repository: <a href="https://github.com/jtalented/startup.git" target="_blank" rel="noopener noreferrer">GITHUB</a></p>
            </footer>
        </div>
    );
}

export default About;
