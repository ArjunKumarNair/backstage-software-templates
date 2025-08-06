const express = require('express');
require('dotenv').config();


const {embedChunks, embedQuery} = require('./app.js');

const app = express()
const port = 3022

app.use(express.json())

app.post('/embedChunks', async (req, res)=> {
    try {
    const {chunks} = req.body;
    const embeddings = await embedChunks(chunks);
    res.json({embeddings});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Something went wrong.'})
    }
});


app.post('/embedQuery', async (req, res)=> {
    try {
    const {query} = req.body;
    const embedding = await embedQuery(query);
    res.json({embedding});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Something went wrong.'})
    }
});

app.get('/health', (req, res) => {
    res.json({ status: "UP" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});