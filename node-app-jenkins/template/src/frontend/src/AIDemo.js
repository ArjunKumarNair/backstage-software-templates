import { useState } from 'react';
import DataPrepForm from './components/DataPrepForm';
import EmbedForm from './components/EmbedForm';
import VectorDBForm from './components/VectorDBForm';
import RetrievalForm from './components/RetrievalForm';
import RerankForm from './components/RerankForm';
import AnswerDisplay from './components/AnswerDisplay';
import './AIDemo.css';

function AIDemo() {
    const [chunks, setChunks] = useState([]);
    const [embeddings, setEmbeddings] = useState([]);
    const [retrieved, setRetrieved] = useState([]);
    const [question, setQuestion] = useState('');
    const [reranked, setReranked] = useState([]);

    return (
        <div className="pipeline-container">
            <h1 className="title">🧠 Modular AI RAG Pipeline</h1>
            <p className="subtitle">Test each step in the pipeline below</p>

            {/* Step 1 */}
            <div className="step-card">
                <h2>Step 1: Data Preprocessing</h2>
                <DataPrepForm onChunks={setChunks} />
            </div>

            <Arrow visible={chunks.length > 0} />

            {/* Step 2 */}
            <div className={`step-card ${chunks.length === 0 ? 'disabled' : ''}`}>
                <h2>Step 2: Embedding</h2>
                {chunks.length > 0 && (
                    <EmbedForm chunks={chunks} onEmbeddings={setEmbeddings} />
                )}
            </div>

            <Arrow visible={embeddings.length > 0} />

            {/* Step 3 */}
            <div className={`step-card ${embeddings.length === 0 ? 'disabled' : ''}`}>
                <h2>Step 3: Store in Vector DB</h2>
                {embeddings.length > 0 && (
                    <VectorDBForm chunks={chunks} embeddings={embeddings} />
                )}
            </div>

            <Arrow visible={true} />

            {/* Step 4 */}
            <div className="step-card">
                <h2>Step 4: Retrieval</h2>
                <RetrievalForm onRetrieved={setRetrieved} onQuery={setQuestion} />
            </div>

            <Arrow visible={retrieved.length > 0} />

            {/* Step 5 */}
            <div className={`step-card ${retrieved.length === 0 ? 'disabled' : ''}`}>
                <h2>Step 5: Rerank (Optional)</h2>
                {retrieved.length > 0 && (
                    <RerankForm
                        documents={retrieved}
                        question={question}
                        onReranked={setReranked}
                    />
                )}
            </div>

            <Arrow visible={retrieved.length > 0} />

            {/* Step 6 */}
            <div className={`step-card ${retrieved.length === 0 ? 'disabled' : ''}`}>
                <h2>Step 6: Final Answer</h2>
                {retrieved.length > 0 && (
                    <AnswerDisplay
                        docs={reranked.length > 0 ? reranked : retrieved}
                        question={question}
                    />
                )}
            </div>
        </div>
    );
}

// Arrow component
function Arrow({ visible }) {
    return visible ? (
        <div className="arrow">⬇️</div>
    ) : (
        <div className="arrow faded">⬇️</div>
    );
}


export default AIDemo;

