import React from 'react'

export const ThemeContext = React.createContext({
    startPoint: false,
    updateStartPoint: () => {}
});

export const changeState = (id) => {
    const element = document.getElementById(id);
    element.style.backgroundColor = "#23eb3a";
}