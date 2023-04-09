import React, {useState, useEffect, useRef, useContext} from 'react';
import ReactDOM from 'react-dom/client';
import { DFS, BFS } from '../utils/functions';
import { ThemeContext } from '../utils/context';

function Navbar() {


  return (
    <>
        <div className="w-full h-[80px] bg-blue-400 flex items-center">
            <div className="flex justify-between items-center w-full px-8">
                <h1 className="m-0 text-white text-4xl p-0">Path Finder</h1>
                <div>
                    <p className="text-blue-400 bg-white p-3 rounded-lg hover:scale-110 cursor-pointer hover:font-semibold">
                        Visualize
                    </p>
                </div>
                <div>
                    <p>Algorithms</p>
                </div>
            </div>
        </div>
    </>
  );
}

export default Navbar;
