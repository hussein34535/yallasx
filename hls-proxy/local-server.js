const express = require('express');
const handler = require('./api/index.js');
console.log('Handler loaded type:', typeof handler);

const app = express();
const PORT = 3001;

app.get('/api/index', async (req, res) => {
    console.log('Request received for:', req.query.url);
    try {
        await handler(req, res);
        console.log('Handler processed request');
    } catch (error) {
        console.error("Handler error:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running locally at http://localhost:${PORT}/api/index`);
    console.log(`Test URL: http://localhost:${PORT}/api/index?url=https://wikinew.giokko.ru/wiki/yallalive5172/mono.css`);
});
