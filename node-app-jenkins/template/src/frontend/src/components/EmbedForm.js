import axios from 'axios';

export default function EmbedForm({ chunks, onEmbeddings }) {
    const handleEmbed = async () => {
        const res = await axios.post('/api/embedding', { chunks });
        onEmbeddings(res.data.embeddings);
    };

    return (
        <div>
            <h3>Step 2: Embed Chunks</h3>
            <button onClick={handleEmbed}>Generate Embeddings</button>
        </div>
    );
}
