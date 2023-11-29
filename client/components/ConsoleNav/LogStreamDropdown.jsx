// LogStreamDropdown.jsx
import React from 'react';
import '../../src/styles/ConsoleNav.module.css';

function LogStreamDropdown({ selectedLogStream, handleSelectStreamChange, logStreamOptions }) {
  return (
    <select value={selectedLogStream} onChange={handleSelectStreamChange}>
      <option key="default" value="">
        Select a Log Stream
      </option>
      {logStreamOptions}
    </select>
  );
}

export default LogStreamDropdown;
