const express = require('express');
const {embedChunks} = require('./index.js');
const router = express.Router();

router.post('/embedding', async (req, res) => {
    const {chunks} = req.body;
    const embeddings = await embedChunks(chunks);
    res.json({embeddings});
});

module.exports = router;