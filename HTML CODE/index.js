const express = require('express');
const app = express();

// The service port. In production, the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Define an array to store submitted prompts
let submittedPrompts = [];

// Endpoint to fetch submitted prompts
apiRouter.get('/prompts', (_req, res) => {
    res.json(submittedPrompts);
});

// Endpoint to submit a prompt
apiRouter.post('/submitPrompt', (req, res) => {
    const { username, date, prompt } = req.body;
    if (!username || !date || !prompt) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    // Store the submitted prompt
    submittedPrompts.push({ username, date, prompt });
    res.json(submittedPrompts);
});

// Return the page
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
