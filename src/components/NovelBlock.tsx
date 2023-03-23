import {Novel} from '../pages/create/index';


const NovelBlock:React.FC<Novel> = ({index, content, isAI}) => {
    let headText = ''
    if(isAI){
        headText = 'AI'
    } else {
        headText = 'あなた'
    }

    return (
        <div className='w-full border border-gray-300 bg-white rounded p-2 flex flew-row my-2'>
            <div className='text-green-500 min-w-[10%]'>{headText}</div>
            <div className='ml-3'>{content}</div>
        </div>
    );
}

export default NovelBlock;