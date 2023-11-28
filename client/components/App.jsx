import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Console from './Console.jsx';
import '../src/styles.css';
import Credentials from './Credentials.jsx';
import ConsoleNav from './ConsoleNav.jsx';
import useLogGroups from '../hooks/useLogGroups';
import useLogStreams from '../hooks/useLogStreams';
import useLogs from '../hooks/useLogs';
import useThemeButton from '../hooks/useThemeButton.js';
import useSearch from '../hooks/useSearch.js';

const App = () => {

  /*********************** Initialize State for Credentials  ***************************/
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [region, setRegion] = useState('');

  /*********************** Custom Hook for Log Groups fetch and state  ***************************/

  const {
    logGroups,
    selectedLogGroup,
    setSelectedLogGroup,
    fetchLogGroups,
  } = useLogGroups(accessKey, secretKey, region);

  /*********************** Custom Hook for Log Streams fetch and state  ***************************/

  const {
    logStreams,
    selectedLogStream,
    setSelectedLogStream,
    fetchLogStreams,
  } = useLogStreams(accessKey, secretKey, region, selectedLogGroup);

  /*********************** Custom Hook for Logs fetch and state  ***********************************/

  const {
    logs,
    fetchLogs,
    setLogs,
  } = useLogs(accessKey, secretKey, region, selectedLogGroup, selectedLogStream);
 

  /* ******************** THEME BUTTON CLICK HANDLER  *********************************************/

  const {
    theme,
    themeButton,
    handleThemeButtonClick,
  } = useThemeButton();

  /* ******************** SEARCH QUERY HANDLER  ******************* */
  
  const {
    jsonString,
    searchQuery,
    handleSearchChange
  } = useSearch(logs);


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element=
          {
            <Credentials
              setAccessKey={setAccessKey}
              accessKey={accessKey}
              setSecretKey={setSecretKey}
              secretKey={secretKey}
              setRegion={setRegion}
              region={region}
              getLogs={fetchLogs}
              getLogGroups={fetchLogGroups}
            />
          }
        />

        <Route path="/console" element=
          {
            <>
              <ConsoleNav
                getLogs={fetchLogs}
                getLogStreams={fetchLogStreams}
                getLogGroups={fetchLogGroups}
                logStreams={logStreams}
                setSelectedLogStream={setSelectedLogStream}
                selectedLogStream={selectedLogStream}
                selectedLogGroup={selectedLogGroup}
                setSelectedLogGroup={setSelectedLogGroup}
                handleThemeButtonClick={handleThemeButtonClick} 
                themeButton={themeButton}
                logGroups={logGroups}
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
                setLogs={setLogs}
              />
              <Console
                jsonString={jsonString}
                theme={theme}
              />
            </>
          } 
        />
      </Routes>
    </Router>
  );
};









export default App;


