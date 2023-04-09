import React, {useState, useContext } from 'react';
import { setState, resetBoard, resetBlockers, clearCell } from "../utils/functions"
import { ThemeContext } from '../utils/context';

function Grid() {

    const rows = []
    const context= useContext(ThemeContext);

    const [cellState, setCellState] = useState('start');
    const [mouseDown, setMouse] = useState(false);

    const [startPoint, setStart] = useState(false);
    const [endPoint, setEnd] = useState(false);

    for (let i = 0; i < 20; i++) {
        const cols = [];
        for (let j = 0; j < 30; j++) {
            cols.push(`${i}-${j}`);
        }
        rows.push(cols);
    }

    const handleCellClick = (cell) => {
        if (cellState == 'blocker') {
            setBlocker(cell);
            return;
        }
        if (cellState == 'start') {
            if (startPoint) clearCell(startPoint);
            setState(cell, cellState);
            setStart(cell);
            context.updateStartPoint(cell);
        } else {
            if (endPoint) clearCell(endPoint,);
            setState(cell, cellState);
            setEnd(cell);      
        }
    }

    const setBlocker = (cell) => {
        if (cell != startPoint && cell != endPoint) {
            setState(cell, cellState);
        }
    }

    const handleMouseDown = () => {
        setMouse(true);
    }

    const handleMouseUp = () => {
        setMouse(false);
    }
    
    const handleMouseEnter = (cell) => {
        if (cellState !== 'blocker' || !mouseDown) return;
        const elem = document.getElementById(cell);
        const type = elem.getAttribute('data-type');
        if (type !== 'empty') return;
        setState(cell, "blocker");
    }

    
  return (
    <>
        <div className={"w-full bg-red-100 h-[100vh] pt-8"}>
            <div className={'flex justify-between items-center max-w-[600px] mx-auto mb-10'}>
                <h3 className={'cursor-pointer'} onClick={() => setCellState('start')}>Set Start Point</h3>
                <h3 className={'cursor-pointer'} onClick={() => setCellState('blocker')}>Set Blocker</h3>
                <h3 className={'cursor-pointer'} onClick={() => setCellState('end')}>Set Endpoint</h3>
            </div>
            <table className={"max-w-[900px] mx-auto h-auto"}>
                <tbody>
                    {rows.map(cols => {
                        return (
                            <tr className={"cellWrapper"}>
                                {cols.map(cell => {
                                    return (
                                        <td id={cell} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseEnter={() => handleMouseEnter(cell)} data-type="empty" onClick={() => handleCellClick(cell)} className={"w-[25px] h-[25px] border border-solid border-black"}></td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className={'flex justify-center mx-auto gap-x-10'}>
                <h1 className={"pt-10 cursor-pointer"} onClick={() => resetBoard()}>Reset Board</h1>
                <h1 className={"pt-10 cursor-pointer"} onClick={() => resetBlockers()}>Reset Blockers</h1>
            </div>
        </div>
    </>
  );
}

export default Grid;
