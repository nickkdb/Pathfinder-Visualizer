import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';

function StatesTest() {

  return (
    <div className={"w-full bg-blue-300 h-[100vh]"}>
        <div className={"pt-40"}>
            <h3> Add Items to list</h3>
            <div className={"pt-5"}>
                <input className={"border border-black border-solid"} ></input>
                <span>Add</span>
            </div>

        </div>

    </div>
  );
}

export default StatesTest;
