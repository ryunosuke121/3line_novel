import Layout from "@/components/Layout";
import NovelBlock from "@/components/NovelBlock";
import axios from "axios";
import { useState } from "react";

export type Novel ={
    index: number,
    content: string,
    isAI: boolean
}

const CreatePost: React.FC = () => {

    const [userText, setUserText] = useState("");
    const [novels, setNovels] = useState<Novel[]>([]);
    const userTextHandler = () => {
        console.log(userText);
        const newBlock = {
            index: novels.length + 1,
            content: userText,
            isAI: false
        }
        setNovels((prevNovels) => ([...prevNovels, newBlock]));
        getAiResponse(userText);
        setUserText("");
    }

    const getAiResponse = async (text: string) => {
        const res = await axios.get('http://localhost:3333/api/openai',{
            params: {
                queryText: text
            }
        })

        console.log(res);
    }
    
    return (
        <Layout>
            <div className="container mx-auto px-4">
                <div className="container mx-auto md:max-w-5xl">
                    {novels.map(({index, content, isAI}) => (
                        <NovelBlock
                            key = {index}
                            index = {index}
                            content = {content}
                            isAI = {isAI}
                        />
                    ))}
                </div>
                <div className="absolute inset-x-0 bottom-4 flex flex-col items-center p-2 max-w-5xl mx-auto">
                    <textarea 
                        className="h-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5" 
                        placeholder="文章を追加"
                        value={userText} 
                        onChange={(e)=>{setUserText(e.target.value)}}/>
                    <button className="inline-block bg-green-500 hover:bg-red-500 text-white rounded px-8 py-2 ml-4 mt-2" onClick={userTextHandler}>
                        追加
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default CreatePost;