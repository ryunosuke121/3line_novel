import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const postId = req.query.id
    const postWithContents = await prisma.post.findUnique({
        where: {
            id: Number(postId)
        },
        include: {
            content: true
        }
    });

    return res.status(200).json(postWithContents);
}

export default handler;