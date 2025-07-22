const express = require('express');

const {normaliseText, splitIntoChunks } = require('./index.js');
const router = express.Router();

router.post('/data-prep', (req, res)=> {
    const {text} = req.body;
    const clean = normaliseText(text);
    const chunks = splitIntoChunks(clean);
    res.json({chunks});
});

module.exports = router;