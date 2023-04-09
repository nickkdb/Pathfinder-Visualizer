import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Grid from "../components/Grid"
import { ThemeContext } from '../utils/context';

function Application() {

    const [start, setStart] = useState("");

    const updateStart = (point) => {
      setStart(point);
    }

  return (
    <ThemeContext.Provider value={{
      startPoint: start,     
      updateStartPoint: updateStart,    
    }}>
        <Navbar />
        <Grid /> 
    </ThemeContext.Provider>
  );
}

export default Application;
