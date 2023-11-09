import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import '../src/styles.css';

export default function Console({ jsonObject, theme, themeButton, handleThemeButtonClick }) {
  SyntaxHighlighter.registerLanguage('json', json);
  const jsonString = JSON.stringify(jsonObject, null, 2);
  
/* Favorite styles
atomOneDark
stackoverflowDark
stackoverflowLight
*/



  return (
    <>
      <h1>THE CONSOLE</h1>
      <span>this is displaying from Console.jsx</span>
      <div id="themeButton">
        <button onClick={handleThemeButtonClick}>{themeButton}</button>
      </div>
      <SyntaxHighlighter language="json" style={theme} showLineNumbers={true} showInlineLineNumbers={true}// This prop enables line numbers
        lineNumberStyle={{ color: '#aaa', paddingRight: '10px' }} className="json-ide">
        {jsonString}
      </SyntaxHighlighter>
    </>
  );
}
