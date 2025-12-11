const express = require('express');
const handler = require('./api/index.js');

const app = express();
const PORT = 3000;

app.get('/api/index', async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        console.error("Handler error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server running locally at http://localhost:${PORT}/api/index`);
    console.log(`Example usage: http://localhost:${PORT}/api/index?url=YOUR_HLS_URL`);
});
