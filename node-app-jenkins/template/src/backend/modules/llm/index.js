const OpenAI = require('openai')
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateAnswer(contextChumks, question) {
    const context = contextChumks.join('\n');
    const prompt = `Context: \n ${context}\n\nQuestion: ${question}\nAnswer:`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt}],
    });

    return completion.choices[0].message.content;
}

module.exports = { generateAnswer };