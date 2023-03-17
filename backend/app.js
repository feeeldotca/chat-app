const express = require('express');
const cors = require('cors');
const { openai } = require('@openai/api');
const app = express();
const port = 3000;

const openaiApiKey = 'YOUR_OPENAI_API_KEY_HERE';

app.use(cors());
app.use(express.json());

app.post('/message', async (req, res) => {
  const message = req.body.message;
  const chatbot = openai({
    apiKey: openaiApiKey,
    model: 'text-davinci-002',
  });
  const response = await chatbot.completions.create({
    prompt: message,
    maxTokens: 50,
    n: 1,
    stop: ['\n'],
  });
  res.json({ response: response.choices[0].text.trim() });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
