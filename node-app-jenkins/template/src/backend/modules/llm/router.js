const express = require('express');

const { generateAnswer } = require('./index.js');
const router = express.Router();

router.post('/llm', async (req, res)=> {
    const {chunks, question} = req.body;
    const answer = await generateAnswer(chunks, question);
    res.json({answer});
});

module.exports = router;