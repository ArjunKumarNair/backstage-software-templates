const express = require('express');
const router = express.Router();

router.use(require('../modules/dataPrep/router.js'));
router.use(require('../modules/embedding/router.js'));
router.use(require('../modules/llm/router.js'));
router.use(require('../modules/rerank/router.js'));
router.use(require('../modules/retrieval/router.js'));
router.use(require('../modules/vectordb/router.js'));

module.exports = router;