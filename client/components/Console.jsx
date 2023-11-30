import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import styles from '../src/styles/Console.module.css';

export default function Console({ theme, jsonString}) {
  SyntaxHighlighter.registerLanguage('json', json);

  return (
    <div className={styles.Console}>

      <SyntaxHighlighter
        language="json"
        style={theme}
        showLineNumbers
        showInlineLineNumbers
        lineNumberStyle={{ color: '#aaa', paddingRight: '10px' }}
        className="json-ide"
      >
        {jsonString}
      </SyntaxHighlighter>
    </div>
  );
}
