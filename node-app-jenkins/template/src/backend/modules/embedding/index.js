const OpenAI = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function embedChunks(chunks) {
    const result = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: chunks,
    });
    return result.data.map(d => d.embedding);
}

module.exports = { embedChunks };