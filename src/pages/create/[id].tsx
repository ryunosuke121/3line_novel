import Layout from "@/components/Layout";
import NovelBlock from "@/components/NovelBlock";
import axios from "axios";
import { useRouter } from "next/router";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";

export type Novel = {
    index: number,
    content: string,
    isAI: boolean
}

export type CreatePostProps = {
    id: number,
    theme: string[]
}

const CreatePost: React.FC<CreatePostProps> = ({ id }) => {

    const router = useRouter();
    const theme = router.query.theme;
    const [userText, setUserText] = useState("");
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
    

    const pushUserText = () => {
        const newMessage: ChatCompletionRequestMessage = {
            role: 'user',
            content: `${userText}`
        }
        postMessageToAi([...messages, newMessage]);
        setMessages((prevMessages) => ([...prevMessages, newMessage]))
        setUserText("");
    }

    const [responseText, setResponseText] = useState('')

    const generateAiText = async () => {
        const newMessage: ChatCompletionRequestMessage = {
            role: 'user',
            content: 'あなたが作成してください'
        }
        const aiResponse = await postMessageToAi([...messages, newMessage]);
        console.log(aiResponse);
        setResponseText('');
        setMessages((prevMessages) => ([...prevMessages, {'role': 'assistant', 'content': aiResponse!}]));
    }

    const postMessageToAi = async (message: ChatCompletionRequestMessage[]) => {
        const response = await fetch("/api/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message, theme
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = response.body;
        if (!data) {
            return;
        }
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let aiResponse :string = '';

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            aiResponse += chunkValue;
            setResponseText(aiResponse);
        }

        return aiResponse;

    }



    return (
        <Layout>
            <div className="container mx-auto px-4">
                <div className="container mx-auto md:max-w-5xl mb-96">
                    {messages.map(({ role, content }, index) => (
                        <NovelBlock
                            key={index}
                            role={role}
                            content={content}
                        />
                    ))}
                    {responseText === '' ? <></> : <NovelBlock
                        role={'assistant'}
                        content={responseText}
                    />}
                </div>
                <div className="fixed inset-x-0 bottom-4 flex flex-col items-center p-2 w-[100%]">
                    <textarea
                        className="h-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[80%] lg:max-w-[60%] p-2.5"
                        placeholder="文章を追加"
                        value={userText}
                        onChange={(e) => { setUserText(e.target.value) }} />
                    <div>
                        <button className="inline-block bg-green-500 hover:bg-red-500 text-white rounded px-8 py-2 ml-4 mt-2" onClick={pushUserText}>
                            追加
                        </button>
                        <button className="inline-block bg-green-500 hover:bg-red-500 text-white rounded px-8 py-2 ml-4 mt-2" onClick={generateAiText}>
                            AI生成
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CreatePost;