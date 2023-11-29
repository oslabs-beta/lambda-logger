// InputBox.jsx
import React from 'react';
import '../../src/styles/ConsoleNav.module.css';

function InputBox({ searchQuery, handleSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search logs..."
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
}

export default InputBox;
