const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const app = express();
const config = require('./dbConfig.json');

// The service port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// MongoDB connection URL database (madlib)
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/madlib`;

// Connect to MongoDB
let db;
(async () => {
    try {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(config.database);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
})();

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Endpoint for user authentication
apiRouter.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username exists in database
        let user = await db.collection('users').findOne({ username });

        // If user doesn't exist, create a new user
        if (!user) {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create user object
            user = { username, password: hashedPassword };
            // Insert new user into the database
            await db.collection('users').insertOne(user);
            return res.json({ message: 'Login successful', newUser: true });
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', newUser: false });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Endpoint to fetch submitted prompts
apiRouter.get('/prompts', async (_req, res) => {
    try {
        const prompts = await db.collection('prompts').find({}).sort({ date: -1 }).limit(10).toArray();
        res.json(prompts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Endpoint to submit a prompt
apiRouter.post('/submitPrompt', async (req, res) => {
    const { username, date, prompt } = req.body;
    if (!username || !date || !prompt) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        // Insert new prompt into the prompts collection
        await db.collection('prompts').insertOne({ username, date, prompt });

        // Remove oldest prompts if more than 10 exist
        await db.collection('prompts').find({}).sort({ date: 1 }).skip(10).forEach(async oldestPrompt => {
            await db.collection('prompts').deleteOne({ _id: oldestPrompt._id });
        });

        // Fetch the updated list of prompts
        const updatedPrompts = await db.collection('prompts').find({}).sort({ date: -1 }).limit(10).toArray();
        res.json(updatedPrompts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Return the page
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
