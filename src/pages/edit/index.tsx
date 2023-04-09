import React, { useCallback, useState } from 'react'

export const Editor = () => {
    const [data, setData] = useState({
        time: 0,
        blocks: [
            {
                type: 'header',
                data: {
                    text: 'initial header',
                    level: 3,
                },
            },
        ],
        version: '',
    });

    // const handleClick = useCallback(() => {
    //     getData().then((dat) => setData(dat));
    // }, [setData, getData]);

    return (
        <div className='bg-white'>
            <div>{JSON.stringify(data || {})}</div>
        </div>
    );
}

export default Editor;
