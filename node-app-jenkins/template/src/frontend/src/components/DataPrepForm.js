import { useState } from 'react';
import axios from 'axios';

export default function DataPrepForm({ onChunks }) {
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/data-prep', { text });
        onChunks(res.data.chunks);
    };

    return (
        <div>
            <h3>Step 1: Data Prep</h3>
            <textarea rows="6" cols="60" value={text} onChange={e => setText(e.target.value)} />
            <br />
            <button onClick={handleSubmit}>Preprocess</button>
        </div>
    );
}
