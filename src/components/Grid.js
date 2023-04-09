import React, {useState, useContext } from 'react';
import { setState, resetBoard, resetBlockers, clearCell } from "../utils/functions"
import { ThemeContext } from '../utils/context';

function Grid() {
    const rows = []
    const context= useContext(ThemeContext);

    //when react rerenders it resets most variable types values
    //useState doesn't get reset
    //the first item in array is the variable, the second item is the function to update variable

    const [cellState, setCellState] = useState('start'); //this state is switched to 'start', 'end', 'blocker', when they click the buttons below
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

    //set the color when a they click on the td (uses the id on the element to target it) 
    const handleCellClick = (cell) => {
        //since there can be multiple blockers, we don't run the same code as for start/end, which can only have one
        if (cellState == 'blocker') { 
            setBlocker(cell);
            return;
        }
        if (cellState == 'start') {
            if (startPoint) clearCell(startPoint); // if a startPoint already exists, clear it out for the new one
            setState(cell, cellState); //setState function from functions.js file, changes color of html element
            setStart(cell);
            context.updateStartPoint(cell); //ISAIAH: ignore this 
        } else {
            if (endPoint) clearCell(endPoint); // if endpoint already exists, clear it out for new one
            setState(cell, cellState); //setState function from functions.js file, changes color of html element
            setEnd(cell);       
        }
    }

    const setBlocker = (cell) => {
        // as long as the cell isn't already the start point or end point, make it a blocker
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
            <div className={'flex justify-center items-center gap-x-8 max-w-[600px] mx-auto mb-10'}>
                {/* clicking these buttons changes what "state" the cells are in, which determines what color it changes to*/}
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
                                        //onClick function runs the code above to change the color
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
