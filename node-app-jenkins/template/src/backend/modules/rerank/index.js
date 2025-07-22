const OpenAI = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function rerank(question, documents) {
    const reranked = await Promise.all(
        documents.map(async (doc) => {
            const prompt = `Given the question: "${question}", how relevant is this content? \n\n"${doc.text}"\n\n Give a score between 0 and 1.`
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: prompt}],
            });
            const score = parseFloat(response.choices[0].message.content);
            return {...doc, rerankScore: isNaN(score) ? 0 : score};
        })
    );
    return reranked.sort((a,b) => b.rerankScore - a.rerankScore);
}

module.exports = {rerank};

