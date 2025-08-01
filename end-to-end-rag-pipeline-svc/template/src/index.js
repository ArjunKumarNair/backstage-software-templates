const express = require('express');
require('dotenv').config();

const {normaliseText, splitIntoChunks, embedChunks, embedQuery, upsertDocuments, querySimilar, retrieveRelevantDocs, generateAnswer} = require('./app.js');

const app = express()
const port = 4000

app.use(express.json())

// Data Preparation

app.post('/data-prep', (req, res)=> {
    const {text} = req.body;
    const clean = normaliseText(text);
    const chunks = splitIntoChunks(clean);
    res.json({chunks});
});

// Embedding

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

// Vector DB

app.post('/upsert', (req, res)=> {
    const { docs } = req.body;
    upsertDocuments(docs);
    res.json({message: 'Upserted successfully'});
});

app.post('/query', async (req, res)=> {
    const { query } = req.body;
    try{
        const [embedding] = await embedQuery(query);
        const results = querySimilar(embedding);
        textList = results.map(d => d.text)
        console.log("textList: ", textList)
        res.json({ textList });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Something went wrong.'})
    }
});

// LLM

app.post('/llm', async (req, res)=> {
    const {chunks, question} = req.body;

    if (!Array.isArray(chunks) || typeof question != 'string') {
        return res.status(400).json({error: 'Invalid input: contextChunks should be an array and question should be a string.'})
    }
    try{
    const answer = await generateAnswer(chunks, question);
    res.json({answer});
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