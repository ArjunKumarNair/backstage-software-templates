const express = require('express');
const { retrieveRelevantDocs } = require('./index.js');
const router = express.Router();

router.post('/retrieval', async (req, res) => {
    const {query} = req.body;
    const results = await retrieveRelevantDocs(query);
    res.json({ results });
});

module.exports = router;