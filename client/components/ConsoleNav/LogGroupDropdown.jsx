// LogGroupDropdown.jsx
import React from 'react';
import '../../src/styles/ConsoleNav.module.css';

function LogGroupDropdown({ selectedLogGroup, handleSelectChange, logGroupOptions }) {
  return (
    <select value={selectedLogGroup} onChange={handleSelectChange}>
      <option key="default" value="">
        Select a Log Group
      </option>
      {logGroupOptions}
    </select>
  );
}

export default LogGroupDropdown;
