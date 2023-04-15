import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { ChatCompletionRequestMessage } from "openai";
import { PrismaClient } from '@prisma/client'

interface PostRequest extends NextApiRequest {
    body: {
        messages: ChatCompletionRequestMessage[]
        title: string
    }
}

const prisma = new PrismaClient();

const handler = async (req: PostRequest, res: NextApiResponse) => {
    const { messages, title } = req.body;
    const result = prisma.post.create({
        data: {
            author: { connect: { id: 1} },
            title: title,
            content: {
                create: messages.map((message) => {
                    return {
                        message: message.content
                    }
                })
            }
        }
    })

    return res.status(201).json(result)
}