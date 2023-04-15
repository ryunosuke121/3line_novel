import axios from "axios";
import { ChatCompletionRequestMessage } from "openai";

//小説を投稿する
export const postNovel = async (messages: ChatCompletionRequestMessage[], title: string) => {
    const response = await axios.post('/api/post', {
        messages, title
    });
    console.log(response);
    return response
}

//Postidに対応する小説を取得する
export const getNovel = async (id: number) => {
    const response = await axios.get(`/api/post/${id}`);
    console.log(response);
    return response
}