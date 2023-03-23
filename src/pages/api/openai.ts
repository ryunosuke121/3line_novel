import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
    
    const openai = new OpenAIApi(configuration);
    console.log(req.query);
    const {queryText} = req.query;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${queryText}`,
        temperature: 1,
        max_tokens: 200,
      });
    console.log(response.data.choices[0]);
    res.status(200)
}

export default handler;