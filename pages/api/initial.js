import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function handler(req, res) {
  if (!req.body || typeof req.body !== "object") {
    res.status(415).json({ message: "Method not allowed" });
    return;
  }

  const promt = `Give me an initial response email for email below. The response email will send by ${req.body.senderName}. Add sender name at the end of the response.\n\n` +
    //`Sender Name: ${req.body.senderName}\n` +
    `From: ${req.body.from}\n` +
    `Title: ${req.body.title}\n` +
    `Subject: ${req.body.subject}\n`;
  openai.createCompletion("text-davinci-002", {
    prompt: promt,
    temperature: 0.7,
    max_tokens: 100,
    frequency_penalty: 0.24,
    presence_penalty: 0.23
  }).then(response => {
    res.status(response.status).json(response.data);
  });
}
