import React, { useEffect, useState } from 'react';
import '../src/styles.css';
import styles from '../src/styles/ConsoleNav.module.css';

export default function ConsoleNav({ getLogGroups, handleThemeButtonClick, themeButton, logGroups, selectedLogGroup, setSelectedLogGroup, getLogStreams, logStreams, selectedLogStream, setSelectedLogStream, getLogs}) {
  const [logGroupOptions, setLogGroupOptions] = useState([]);
  const [logStreamOptions, setLogStreamOptions] = useState([]);
  console.log('selectedLog Group:', selectedLogGroup);
  console.log('selectedLog Stream:', selectedLogStream);
  useEffect(() => {
    if (logGroups && Array.isArray(logGroups)) {
      const options = logGroups.map((logGroup, index) => (
        <option key={index} value={logGroup}>{logGroup}</option>
      ));
      setLogGroupOptions(options);
    }
  }, [logGroups]);

  useEffect(() => {
    if (logStreams && Array.isArray(logStreams)) {
      const options = logStreams.map((logStream, index) => (
        <option key={index} value={logStream}>{logStream}</option>
      ));
      setLogStreamOptions(options);
    }
  }, [logStreams]);

  // useEffect(() => {
  //     if (selectedLogGroup) {
  //         getLogStreams();
  //     }
  // }, [selectedLogGroup, getLogStreams]);
    
  // useEffect(() => {
  //     if (selectedLogStream) {
  //         getLogs();
  //     }
  // }, [selectedLogStream, getLogs]);

  const handleSelectChange = (e) => {
    setSelectedLogGroup(e.target.value);
    getLogStreams();
  };
  const handleSelectStreamChange = (e) => {
    setSelectedLogStream(e.target.value);
    getLogs();
    // setSelectedLogGroup(e.target.value);
    // getLogStreams();
    console.log('selected log stream:', selectedLogStream);
  };

  return (
    <div className={styles.ConsoleNav}>
      <select value={selectedLogGroup} onChange={handleSelectChange}>
        <option key="default" value="">
          Select a Log Group
        </option>
        {logGroupOptions}
      </select>
      <select value={selectedLogStream} onChange={handleSelectStreamChange}>
        <option key="default" value="">
          Select a Log Stream
        </option>
        {logStreamOptions}
      </select>
      <button onClick={handleThemeButtonClick}>{themeButton}</button>
      <button onClick={getLogGroups}>Refresh</button>
    </div>
  );
}