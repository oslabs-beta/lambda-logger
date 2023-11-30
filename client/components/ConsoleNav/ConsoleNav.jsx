import React from 'react';
import '../../src/styles.css';
import styles from '../../src/styles/ConsoleNav.module.css';
import LogGroupDropdown from './LogGroupDropdown.jsx';
import LogStreamDropdown from './LogStreamDropdown.jsx';
import InputBox from './InputBox.jsx';
import ThemeButton from './ThemeButton.jsx'; 
import RefreshButton from './RefreshButton.jsx'; 
import useLogGroupOptions from '../../hooks/useLogGroupOptions';
import useLogStreamOptions from '../../hooks/useLogStreamOptions';
import useSelectStream from '../../hooks/useSelectStream';
import useSelectGroup from '../../hooks/useSelectGroup';

export default function ConsoleNav({ searchQuery, handleSearchChange, getLogGroups, handleThemeButtonClick, themeButton, logGroups, selectedLogGroup, setSelectedLogGroup, getLogStreams, logStreams, selectedLogStream, setSelectedLogStream, setLogs }) {

  const { logGroupOptions } = useLogGroupOptions(logGroups);
  const { logStreamOptions } = useLogStreamOptions(logStreams);
  const { handleSelectStreamChange } = useSelectStream(setSelectedLogStream);
  const { handleSelectChange } = useSelectGroup(setSelectedLogGroup);

  return (
    <div className={styles.ConsoleNav}>
      <LogGroupDropdown
        selectedLogGroup={selectedLogGroup}
        handleSelectChange={handleSelectChange}
        logGroupOptions={logGroupOptions}
      />
      <LogStreamDropdown
        selectedLogStream={selectedLogStream}
        handleSelectStreamChange={handleSelectStreamChange}
        logStreamOptions={logStreamOptions}
      />
      <InputBox
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      <ThemeButton
        handleThemeButtonClick={handleThemeButtonClick}
        themeButton={themeButton}
      />
      <RefreshButton
        getLogGroups={getLogGroups}
        getLogStreams={getLogStreams}
        setLogs={setLogs}
      />
    </div>
  );
}