const modelProvider = process.env.MODEL_PROVIDER || 'OpenAI';
let aiClient;

if (modelProvider.toLowerCase() === 'claude') {
    // Example: using Anthropic Claude SDK (replace with actual implementation)
    const { Claude } = require('anthropic'); // or your Claude SDK
    aiClient = new Claude({ apiKey: process.env.CLAUDE_API_KEY });
} else {
    const OpenAI = require('openai');
    aiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

async function embedChunks(chunks) {
    const result = await aiClient.embeddings.create({
        model: 'text-embedding-ada-002',
        input: chunks,
    });

    embeddings = result.data.map(d => d.embedding)
    const docs = chunks.map((text, i) => ({
        id: `doc-${i}`,
        text,
        embedding: embeddings[i]
    }));

    return docs;
}



async function embedQuery(query) {
    const result = await aiClient.embeddings.create({
        model: 'text-embedding-ada-002',
        input: query,
    });

    return result.data.map(d => d.embedding);
}

module.exports = { embedChunks, embedQuery };