const OpenAI = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


function normaliseText(text) {
    return text.trim().replace(/\s+/g, ' ');
}

function splitIntoChunks(text, chunkSize = 200) {
    const words = text.split(' ');
    const chunks = []

    for (let i = 0; i < words.length; i += chunkSize) {
        chunks.push(words.slice(i, i+chunkSize).join(' '));
    }
    return chunks;
}


async function embedChunks(chunks) {
    const result = await openai.embeddings.create({
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
    const result = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: query,
    });

    return result.data.map(d => d.embedding);
}


const vectorStore = []

function cosineSimilarity(a, b) {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum+ val*val, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum+ val*val, 0));
    return dot / (normA * normB);
}

function upsertDocuments(docs) {
    vectorStore.push(...docs);
}

function querySimilar(embedding, topK = 3) {
    results = vectorStore
    .map(doc => ({ ...doc, score: cosineSimilarity(embedding, doc.embedding)}))
    .sort((a,b) => b.score - a.score)
    .slice(0, topK);
    return results
}


// Calls the embedding service
async function embedQueryRemote(query) {
    const data = await embedQuery(query)
    return data.embedding;
}

// Calls the vectorDB service

async function querySimilarRemote(embedding) {
    const results = querySimilar(embedding);
    textList = results.map(d => d.text)
    return textList;
}

async function retrieveRelevantDocs(query) {
    const [embedding] = await embedQueryRemote([query]);
    const topDocs = await querySimilarRemote(embedding);
    return topDocs;
    // return embedding
 }


async function generateAnswer(contextChunks, question) {
    const context = contextChunks.join('\n');
    const prompt = `Context: \n ${context}\n\nQuestion: ${question}\nAnswer:`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt}],
    });

    return completion.choices[0].message.content;
}


module.exports = { normaliseText, splitIntoChunks, embedChunks, embedQuery, upsertDocuments, querySimilar, retrieveRelevantDocs, generateAnswer };