// ThemeButton.jsx
import React from 'react';
import '../../src/styles/ConsoleNav.module.css';

function ThemeButton({ handleThemeButtonClick, themeButton }) {
  return (
    <button onClick={handleThemeButtonClick}>{themeButton}</button>
  );
}

export default ThemeButton;
