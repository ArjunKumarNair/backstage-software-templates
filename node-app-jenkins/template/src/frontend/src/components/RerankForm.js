import axios from 'axios';

export default function RerankForm({ documents, question, onReranked }) {
    const handleRerank = async () => {
        const res = await axios.post('/api/rerank', { documents, question });
        onReranked(res.data.reranked);
    };

    return (
        <div>
            <h3>Step 5: Rerank (Optional)</h3>
            <button onClick={handleRerank}>Rerank Documents</button>
        </div>
    );
}
