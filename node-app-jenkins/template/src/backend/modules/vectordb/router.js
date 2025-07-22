const express = require('express');
const {upsertDocuments, querySimilar} = require('./index.js');
const router = express.Router();

router.post('/vectordb/upsert', (req, res) => {
    const { docs } = req.body;
    upsertDocuments(docs);
    res.json({message: 'Upserted successfully'});
});

router.post('/vectordb/query', (req, res) => {
    const { embedding } = req.body;
    const results = querySimilar(embedding);
    res.json({ results });
});

module.exports = router;