import Layout from "@/components/Layout";
import NovelBlock from "@/components/NovelBlock";
import axios from "axios";
import Link from 'next/link'
import { ChatCompletionRequestMessage } from "openai";
import React from "react";
import { useState } from "react";
import { isInt8Array } from "util/types";



const ChoiceTheme: React.FC = () => {

    const [choicedThemes, setchoicedThemes] = useState<string[]>([]);
    const themes = ['ファンタジー', '宇宙', '歴史', '恋愛', 'お下烈', '宗教', 'SF', '官能', 'ホラー', 'BL', 'ミステリー', 'アクション', '戦争', 'ロボット', 'コメディ', '西部劇']
    const [buttons, setButtons] = useState([...Array(themes.length)].map((_, i) => 'border-gray-400'));
    const [userTheme, setUserTheme] = useState("");
    const [isAiFirst, setIsAiFirst] = useState(true);

    const themeHandler = (theme: string) => {
        const themeIndex = choicedThemes.findIndex(element => element === theme);
        if (themeIndex === -1) {
            setchoicedThemes((prevchoicedThemes) => ([...prevchoicedThemes, theme]));
        } else {
            setchoicedThemes((prevchoicedThemes) => ([...prevchoicedThemes.slice(0, themeIndex), ...prevchoicedThemes.slice(themeIndex + 1)]))
        }
    }


    const toggleButton = (i: number) => {
        setButtons((prevButtons) => prevButtons.map((button, j) => {
            if (i === j) {
                if (button === 'border-gray-400') {
                    return 'border-blue-500';
                } else {
                    return 'border-gray-400';
                }
            } else {
                return button;
            }
        }))
    }

    return (
        <Layout>
            <div className="container flex justify-center mt-4">
                <div className="container mx-auto bg-white border border-gray-300 max-w-2xl rounded shadow p-4 " >
                    <div className="mx-auto text-center p-2 font-semibold text-2xl border-b border-gray-300 mb-5">小説のテーマを決める</div>
                    <div className="p-3">
                        <div className="flex justify-center mx-auto text-center p-2 font-medium text-xl">テーマを選択&nbsp;<span className="text-sm">※複数選択可能</span></div>
                        <div className="p-2 text-center border rounded">
                            {themes.map((theme, i) => (
                                <button
                                    className={`bg-white hover:bg-gray-100 text-gray-800 m-2 font-semibold py-2 px-4 border ${buttons[i]} rounded shadow `}
                                    key={i}
                                    onClick={() => {
                                        themeHandler(theme);
                                        toggleButton(i);
                                    }}
                                >
                                    {theme}
                                </button>
                            ))}
                        </div>
                        <div className="mx-auto text-center p-2 font-medium text-xl mt-4">自作のテーマを追加</div>
                        <input
                            type="text"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500
                                    focus:border-blue-500 block w-full p-2.5 shadow"
                            placeholder="入力例：青春, 野球, サスペンス"
                            value={userTheme}
                            onChange={(e) => setUserTheme(e.target.value)}
                        />
                    </div>
                    <div className="text-center mt-2 justify-center items-center grid grid-cols-5">
                        <div className='col-start-3'>
                            <Link
                                as={`/create`}
                                href={{ pathname: '/create', query: { theme: choicedThemes.join(',') + (userTheme !== '' ? (',' + userTheme) : ''), isAiFirst: isAiFirst } }}             
                            >
                                <button className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-300 hover:to-green-400 text-white font-semibold py-2 px-4 rounded shadow ">
                                    作成する
                                </button>
                            </Link>
                        </div>
                        <div className="flex justify-start p-2 col-span-2">
                            <input type="checkbox" id='check' className="checked:bg-blue-500" checked={isAiFirst} onChange={() => setIsAiFirst(prevState => !prevState)} />
                            <span className="ml-2">AIから書き始める</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ChoiceTheme;