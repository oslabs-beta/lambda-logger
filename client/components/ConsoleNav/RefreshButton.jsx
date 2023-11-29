// RefreshButton.jsx
import React from 'react';
import '../../src/styles/ConsoleNav.module.css';

function RefreshButton({ getLogGroups, getLogStreams, setLogs }) {
  return (
    <button onClick={() => {
      getLogGroups();
      getLogStreams();
      setLogs("LATEST LOGS LOADED FROM CLOUDWATCH, PLEASE SELECT NEW LOGS TO VIEW");
    }}>Refresh</button>
  );
}

export default RefreshButton;
