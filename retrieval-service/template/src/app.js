// Calls the embedding service
async function embedQueryRemote(query) {
    const response = await fetch('http://embedding-svc:3022/embedQuery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    });
    const data = await response.json();
    return data.embedding;
}

// Calls the vectorDB service
async function querySimilarRemote(embedding) {
    const response = await fetch('http://vectordb-svc:3023/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embedding })
    });
    const data = await response.json();
    return data.textList;
}

async function retrieveRelevantDocs(query) {
    const [embedding] = await embedQueryRemote([query]);
    const topDocs = await querySimilarRemote(embedding);
    return topDocs;
    // return embedding
 }

module.exports = { retrieveRelevantDocs };