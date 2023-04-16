import Layout from "@/components/Layout";
import NovelBlock from "@/components/NovelBlock";
import axios from "axios";
import { useRouter } from "next/router";
import { ChatCompletionRequestMessage } from "openai";
import { useEffect, useState } from "react";
import Link from 'next/link';
import React from "react";
import { postNovel } from "@/lib/Novel";

export type Novel = {
    index: number,
    content: string,
    isAI: boolean
}

export type CreatePostProps = {
    theme: string[]
}

const CreatePost: React.FC<CreatePostProps> = () => {

    const router = useRouter();
    const theme = router.query.theme;
    const isAiFirst = router.query.isAiFirst;
    const [userText, setUserText] = useState("");
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);


    //ユーザーがテキストを追加したときに呼び出される関数
    const pushUserText = async () => {
        const newMessage: ChatCompletionRequestMessage = {
            role: 'user',
            content: `${userText}`
        }
        setMessages((prevMessages) => ([...prevMessages, newMessage]))
        setUserText("");
        const aiResponse = await sendMessageToAi([...messages, newMessage]);
        setResponseText('');
        setMessages((prevMessages) => ([...prevMessages, { 'role': 'assistant', 'content': aiResponse! }]));
    }

    const [responseText, setResponseText] = useState('');

    //AI生成ボタンを押した時の処理
    const generateAiText = async () => {
        const newMessage: ChatCompletionRequestMessage = {
            role: 'user',
            content: 'あなたが作成してください'
        }
        const aiResponse = await sendMessageToAi([...messages, newMessage]);
        setResponseText('');
        setMessages((prevMessages) => ([...prevMessages, { 'role': 'assistant', 'content': aiResponse! }]));
    }

    //AIにメッセージを送信する関数
    const sendMessageToAi = async (message: ChatCompletionRequestMessage[]) => {
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
        let aiResponse: string = '';

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            aiResponse += chunkValue;
            setResponseText(aiResponse);
        }

        return aiResponse;
    }

    //データベースに小説を保存する
    const postHandler = async () => {
        const res = await postNovel(messages, 'testTheme');
        console.log(res.data.id);
        console.log(res);
        router.push(`/edit/${res.data.id}`);
    }

    useEffect(() => {
        if (isAiFirst === 'true') {
            generateAiText();
            console.log('ai first');
        }
    }, []);

    return (
        <Layout>
            <div className="container mx-auto px-4">
                <div className="container mx-auto md:max-w-5xl mb-96 ">
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
                    <div className="flex flex-wrap justify-center items-center w-[80%] mx-auto">
                        <textarea
                            className="h-20 bg-white bg-opacity-80 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full lg:max-w-[80%] p-2.5 "
                            placeholder="文章を追加"
                            value={userText}
                            onChange={(e) => { setUserText(e.target.value) }} />
                        <button className="inline-block bg-gradient-to-r from-green-400 to-green-500 hover:from-green-300 hover:to-green-400 text-white rounded px-8 ml-4 mt-2 lg:mt-0 w-24 h-12" onClick={pushUserText}>
                            追加
                        </button>
                    </div>
                    <div>
                        <button className="inline-block bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-300 hover:to-blue-400 text-white rounded px-8 py-2 ml-4 mt-2" onClick={generateAiText}>
                            AI生成
                        </button>
                        <button
                            // as={'/edit'}
                            // href={{ pathname: '/edit', query: { messages: messages.toString() } }}
                            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-white rounded px-8 py-2 ml-4 mt-2"
                            onClick={postHandler}
                        >
                            編集する
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CreatePost;