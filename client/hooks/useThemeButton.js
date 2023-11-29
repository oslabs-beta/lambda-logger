import { useState, useEffect, useCallback } from 'react';
import {
  stackoverflowDark,
  stackoverflowLight,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';

function useThemeButton() {
  const [theme, setTheme] = useState(stackoverflowDark);
  const [themeButton, setThemeButton] = useState('Light Mode');
  function handleThemeButtonClick() {
    theme === stackoverflowDark
      ? (setTheme(stackoverflowLight), setThemeButton('Dark Mode'))
      : (setTheme(stackoverflowDark), setThemeButton('Light Mode'));
  }
  return {
    theme,
    setTheme,
    themeButton,
    setThemeButton,
    handleThemeButtonClick,
  };
}

export default useThemeButton;
