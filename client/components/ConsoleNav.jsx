import React from 'react';
import '../src/styles.css';

export default function ConsoleNav({handleThemeButtonClick, themeButton}) {
  return (
    <div>
         Console Navbar 
         <select>Select Log Group</select>
         <select>Select Log Stream</select>
         <select>Select Theme</select>
         <div id="themeButton">
        <button onClick={handleThemeButtonClick}>{themeButton}</button>
      </div>
    </div>
  );
};