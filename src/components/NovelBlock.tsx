import { ChatCompletionRequestMessage } from 'openai';
import Image from 'next/legacy/image';



const NovelBlock: React.FC<ChatCompletionRequestMessage> = ({ role, content }) => {
    let headText = ''
    if (role === 'user') {
        headText = 'あなた'
    } else {
        headText = 'AI'
    }

    return (
        <div className='w-full border border-gray-300 bg-white bg-opacity-80 rounded p-2 flex my-2 items-start'>
            {role === 'assistant' ? (
                <>
                    <img src='/AI.png' alt={headText} style={{width: 60, height: 60}} className="block"/>
                    <div className='ml-auto w-[90%] p-2'>{content}</div>
                </>) : (<></>)
            }

            {role === 'user' ? (
                <>
                    <div className='mx-2 max-w-[90%] p-2'>{content}</div>
                    <img src='/dazai_osamu.png' alt={headText} style={{width: 60, height: 60}} className="block ml-auto" />
                </>
            ) : (<></>)}
        </div>
    );
}

export default NovelBlock;