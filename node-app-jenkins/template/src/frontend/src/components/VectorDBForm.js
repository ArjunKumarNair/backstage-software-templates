import axios from 'axios';

export default function VectorDBForm({ chunks, embeddings }) {
    const handleUpsert = async () => {
        const docs = chunks.map((text, i) => ({
            id: `doc-${i}`,
            text,
            embedding: embeddings[i]
        }));
        await axios.post('/api/vectordb/upsert', { docs });
        alert("Docs upserted to vector DB");
    };
    return (
        <div>
            <h3>Step 3: Vector DB</h3>
            <button onClick={handleUpsert}>Upsert Embeddings</button>
        </div>
    );
}