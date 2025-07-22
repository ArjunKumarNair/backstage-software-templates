const express = require('express');
const { rerank } = require('./index.js');
const router = express.Router();

router.post('/rerank', async(req, res) => {
    const {question, documents} = req.body;
    const reranked = await rerank(question, documents);
    res.json({reranked});
});

module.exports = router;