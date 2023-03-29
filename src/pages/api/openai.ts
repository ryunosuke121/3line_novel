import { NextRequest } from 'next/server'
import { ChatCompletionRequestMessage} from "openai";
import { OpenAIStream } from "@/utils/OpenAiStream";

export const config = {
  runtime: 'edge',
}

const handler = async (req: any) => {
  const {message, theme} = (await req.json()) as {
    message: ChatCompletionRequestMessage[],
    theme?: string[]
  }
  // const userMessages:ChatCompletionRequestMessage[]  = req.body.data.message;
  // const theme = req.body.data.theme;
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {role: "system", content: `今から大体100文字ずつ交代で小説の続きを書くゲームをしましょう。テーマは${theme}です。` },
      ...message
    ],
    temperature: 0.9,
    max_tokens: 500,
    stream: true
  }

  const stream = await OpenAIStream(payload);
  return new Response(stream)
  //res.status(200).json({answer: response.data.choices[0].message})
}

export default handler;