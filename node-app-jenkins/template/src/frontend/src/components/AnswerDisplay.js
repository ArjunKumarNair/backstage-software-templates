import { useState } from 'react';
import axios from 'axios';

export default function AnswerDisplay({ docs, question }) {
    const [answer, setAnswer] = useState('');

    const handleGenerate = async () => {
        const res = await axios.post('/api/llm', { chunks: docs.map(d => d.text), question });
        setAnswer(res.data.answer);
    };

    return (
        <div>
            <h3>Step 6: Final Answer</h3>
            <button onClick={handleGenerate}>Generate Answer</button>
            {answer && <p><strong>Answer:</strong> {answer}</p>}
        </div>
    );
}