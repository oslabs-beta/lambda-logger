import React, { useEffect, useState } from 'react';
import '../src/styles.css';
import styles from '../src/styles/ConsoleNav.module.css';
import useLogGroupOptions from "../hooks/useLogGroupOptions"
import useLogStreamOptions from "../hooks/useLogStreamOptions"
import useSelectStream from "../hooks/useSelectStream"
import useSelectGroup from "../hooks/useSelectGroup"

export default function ConsoleNav({ searchQuery, handleSearchChange, getLogGroups, handleThemeButtonClick, themeButton, logGroups, selectedLogGroup, setSelectedLogGroup, getLogStreams, logStreams, selectedLogStream, setSelectedLogStream, getLogs}) {

  const { logGroupOptions } = useLogGroupOptions(logGroups);
  const { logStreamOptions } = useLogStreamOptions(logStreams);
  const { handleSelectStreamChange } = useSelectStream(setSelectedLogStream);
  const { handleSelectChange } = useSelectGroup(setSelectedLogGroup);

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
      <input
        type="text"
        placeholder="Search logs..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={handleThemeButtonClick}>{themeButton}</button>
      <button onClick={() => {
        getLogGroups();
        getLogStreams();
      }}>Refresh</button>
    </div>
  );
}