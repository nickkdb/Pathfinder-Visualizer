import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import Header from '../components/Header';
import Grid from "../components/Grid"
import { ThemeContext } from '../utils/context';

function Application() {


  return (
    <>
    <Navbar />
    <Grid />
    </>
  )
}

export default Application;
