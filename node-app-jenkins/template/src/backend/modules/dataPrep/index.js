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

module.exports = { normaliseText, splitIntoChunks}