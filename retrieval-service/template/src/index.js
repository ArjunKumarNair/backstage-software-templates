const express = require('express');
const { retrieveRelevantDocs } = require('./app.js');

const app = express()
const port = 3024

app.use(express.json())

app.post('/', async (req, res) => {
    const {query} = req.body;
    const results = await retrieveRelevantDocs(query);
    res.json({ results });
});

app.get('/health', (req, res) => {
    res.json({ status: "UP" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});