import { useState } from 'react';
import axios from 'axios';

export default function RetrievalForm({ onRetrieved, onQuery }) {
    const [query, setQuery] = useState('');

    const handleRetrieve = async () => {
        const res = await axios.post('/api/retrieval', { query });
        onRetrieved(res.data.results);
        onQuery(query);
    };

    return (
        <div>
            <h3>Step 4: Retrieve Relevant Docs</h3>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Ask a question..." />
            <button onClick={handleRetrieve}>Retrieve</button>
        </div>
    );
}