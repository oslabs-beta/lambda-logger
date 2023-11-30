// RefreshButton.jsx
import React from 'react';
import '../../src/styles/ConsoleNav.module.css';

function RefreshButton({ setSearchQuery, getLogGroups, getLogStreams, setLogs }) {


  return (
    <button onClick={() => {
      setSearchQuery('');
      getLogGroups();
      getLogStreams();
      setLogs('LATEST LOGS LOADED FROM CLOUDWATCH, PLEASE SELECT NEW LOGS TO VIEW');
    }}>Refresh</button>
  );
}

export default RefreshButton;
