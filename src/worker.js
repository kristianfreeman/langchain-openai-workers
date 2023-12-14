import { Hono } from "hono"
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";

const app = new Hono()

app.get("/", async c => {
  const question = c.req.query("question") || "What is the square root of 9?"

  const model = new ChatOpenAI({
    configuration: {
      baseURL: c.env.GATEWAY_URL
    },
    modelName: "gpt-3.5-turbo",
    openAIApiKey: c.env.OPENAI_API_KEY,
  });

  const prompt = PromptTemplate.fromTemplate(`You're a helpful assistant. Question: {question}`);
  const runnable = prompt.pipe(model);
  const { content } = await runnable.invoke({ question });

  return c.text(content)
})

export default app
