import React, {useState, useContext } from 'react';
import { setState, resetBoard, resetBlockers, clearCell } from "../utils/functions"
import { ThemeContext } from '../utils/context';

function Mygrid() {

    const grid = [];
    const [startpoint, setStart] = useState(false);
    const [endpoint, setEnd] = useState(false);
    
    const handleClick  = (cell) => {
        setState(cell);
    }

    for (let i = 0; i < 20; i++) {
        const cols = [];
        for (let j = 0; j < 30; j++) {
            cols.push(`${i}-${j}`);
        }
        grid.push(cols);
    }

  return (
    <>
       <section className={"w-full bg-red-100 h-[100vh] pt-8"}>

        <div className="flex jusity-between items-center max-w-[600px] mx-auto">
            <h3 className="cursor-pointer">Set start</h3>
            <h3 className="cursor-pointer">Set blocker</h3>
            <h3 className="cursor-pointer">Set end</h3>
        </div>
        <table className="max-w-[900px] mx-auto h-auto">
            <tbody>
                {
                    grid.map(cols => {
                        return (
                            <tr className={"cellWrapper"}>
                                {
                                cols.map(cell => {
                                    return (
                                        <td id={cell} onClick={() => handleClick(cell)} data-type="empty" className="w-[25px] h-[25px] border border-solid border-black"></td>
                                    )
                                })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
       </section>
    </>
  );
}

export default Mygrid;
