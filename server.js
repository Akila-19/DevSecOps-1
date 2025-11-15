const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash'); // Vulnerable dependency for SCA testing

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// --- ROOT PATH (Fixes "Cannot GET /" error) ---
app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to my DevSecOps Project!</h1><p>Test the SAST vulnerability at /hello?name=...</p><p>Check the health at /health</p>');
});

// --- Health Check ---
app.get('/health', (req, res) => {
    res.status(200).send("Node.js App is Running!");
});

// --- Deliberate XSS Vulnerability for SAST Scanning ---
app.get('/hello', (req, res) => {
    // SECURITY FLAW: Direct reflection of user input without sanitization.
    // NJSSCAN is expected to flag this as XSS/Input Validation error.
    const name = req.query.name || 'Guest';
    res.send(`<h1>Hello, ${name}!</h1>`); 
});

// --- Simple Data Endpoint ---
app.get('/data', (req, res) => {
    // Simple endpoint that uses the vulnerable 'lodash' dependency
    const data = {
        message: 'Data loaded successfully.',
        timestamp: _.now() 
    };
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});