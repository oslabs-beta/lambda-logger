/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable indent */
import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import styles from '../src/styles/Console.module.css';

export default function Console({
 jsonObject, theme, themeButton, handleThemeButtonClick, searchQuery
}) {
  SyntaxHighlighter.registerLanguage('json', json);

  const filteredJson = searchQuery
      ? jsonObject.filter(item =>
          JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
        )
      : jsonObject;

  const jsonString = JSON.stringify(filteredJson, null, 2);
  


  return (
    <div className={styles.Console}>
      {/* <h1>THE CONSOLE</h1> */}
      {/* <span>this is displaying from Console.jsx</span> */}

      <SyntaxHighlighter
        language="json"
        style={theme}
        showLineNumbers
        showInlineLineNumbers// This prop enables line numbers
        lineNumberStyle={{ color: '#aaa', paddingRight: '10px' }}
        className="json-ide"
      >
        {jsonString}
      </SyntaxHighlighter>
    </div>
  );
}
