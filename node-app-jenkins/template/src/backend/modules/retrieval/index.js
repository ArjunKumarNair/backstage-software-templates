const { embedChunks } = require('../embedding');
const {querySimilar} = require('../vectordb');

async function retrieveRelevantDocs(query) {
    const [embedding] = await embedChunks([query]);
    const topDocs = querySimilar(embedding);
    return topDocs;
 }

module.exports = { retrieveRelevantDocs };