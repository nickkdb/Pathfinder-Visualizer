import React, { useState } from 'react';
import Header from '../components/Header.js';
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
        <Header />
        <Grid /> 
    </ThemeContext.Provider>
  );
}

export default Application;
