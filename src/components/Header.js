import React, {useState, useEffect, useRef, useContext} from 'react';
import { DFS, BFS } from '../utils/functions';
import { ThemeContext } from '../utils/context';

function Header() {

    const context = useContext(ThemeContext);

    const [algo, setAlgo] = useState("DFS");
    const [submenu, setSubMenu] = useState('hidden');

    const startAlgorithm = () => {
        switch (algo) {
            case "DFS":
                DFS(context.startPoint);
                break;
            case "BFS":
                BFS(context.startPoint);
                break;
        }
    }

  return (
    <>
        <div className={"w-full h-[80px] flex items-center bg-[#2133b8]"}>
            <div className={'px-8 flex justify-between items-center w-full'}>
                <h1 className={'m-0 text-white text-4xl p-0'}>Pathfinder</h1>
                <div>
                    <p onClick={startAlgorithm} className={"text-[#2133b8] bg-white p-3 rounded-lg cursor-pointer transition hover:scale-110"}>
                    Visualize
                    </p>
                </div>
                <div class="flex gap-x-4 relative">
                    <p onMouseOver={() => setSubMenu('block')} className={"inline-block cursor-pointer px-2 text-white p-0 m-0"}>
                            Algorithms
                            <div onMouseLeave={() => setSubMenu('hidden')} className={`${submenu} absolute right-[25%] w-full top-10 bg-white p-4 rounded-[20px]`}>
                                <p onClick={() => setAlgo("DFS")} className={"inline-block cursor-pointer px-2 text-black pb-3 m-0 hover:text-[#00437e] hover:underline"}>Depth First</p>
                                <p onClick={() => setAlgo("BFS")} className={"inline-block cursor-pointer px-2 text-black pb-3 m-0 hover:text-[#00437e] hover:underline"}>Breadth First</p>
                            </div>
                        </p>
                    
                    <p className={"inline-block cursor-pointer px-2 text-white p-0 m-0"}>Reset Board</p>
                </div>
            </div>

        </div>
    </>
  );
}

export default Header;
