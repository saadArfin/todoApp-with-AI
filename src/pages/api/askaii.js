import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this matches your environment variable
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    try {
      const response = await openai.chat.completions.create({
        model:"gpt-4",
        messages: [{ role: "user", content: prompt }],
      });

      res.status(200).json({ response: response.choices[0].message.content });
    //   res.status(200).json({response: "I love ronaldo too"});

    } catch (error) {
      console.error('Error fetching response from ChatGPT:', error.message);
      res.status(500).json({ error: 'Error fetching response from ChatGPT' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
