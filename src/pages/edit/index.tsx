import Layout from '@/components/Layout'
import { ChatCompletionRequestMessage } from 'openai';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';




export const Editor:React.FC = () => {
    const router = useRouter();
    const messages: ChatCompletionRequestMessage[] = router.query!.messages;
    const [text, setText] = useState(() => {
        let text = '';
        messages.forEach((message:ChatCompletionRequestMessage) => {
            text += message.content
        });
        return text;
    });

    return (
        <Layout>
            <div className='container mx-auto w-[90%] md:max-w-4xl h-screen mt-2 justify-center text-center'>
                <textarea value={text} onChange={(e) => { setText(e.target.value) }} className='block mx-auto w-full border shadow outline-0 min-h-[80%]'>

                </textarea>
                <button className="inline-block bg-gradient-to-r from-green-400 to-green-500 hover:from-green-300 hover:to-green-400 text-white rounded px-8 ml-4 mt-2 h-12">
                    保存
                </button>
            </div>
        </Layout>
    );
}

export default Editor;
