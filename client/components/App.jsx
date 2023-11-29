import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Console from './Console.jsx';
import '../src/styles.css';
import Credentials from './Credentials/Credentials.jsx';
import ConsoleNav from './ConsoleNav/ConsoleNav.jsx';
import useLogGroups from '../hooks/useLogGroups';
import useLogStreams from '../hooks/useLogStreams';
import useLogs from '../hooks/useLogs';
import useThemeButton from '../hooks/useThemeButton.js';
import useSearch from '../hooks/useSearch.js';
import Splash from "./Splash/Splash.jsx"

const App = () => {

  /*********************** Initialize State for User Credentials  ************************************/

  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [region, setRegion] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  /*********************** Custom Hook for managing API call fetching log groups and state  ***************************/

  const {
    logGroups,
    selectedLogGroup,
    setSelectedLogGroup,
    fetchLogGroups,
    emptyRegion,
    isLoading,
  } = useLogGroups(accessKey, secretKey, region, setAuthenticated);

  /*********************** Custom Hook for managing API call fetching log streams and state  ***************************/

  const {
    logStreams,
    selectedLogStream,
    setSelectedLogStream,
    fetchLogStreams,
  } = useLogStreams(accessKey, secretKey, region, selectedLogGroup);

  /*********************** Custom Hook for managing API call fetching display logs and state  ***********/

  const {
    logs,
    fetchLogs,
    setLogs,
  } = useLogs(accessKey, secretKey, region, selectedLogGroup, selectedLogStream);
 

  /* ******************** Custom hook for managing theme toggling in React components *****************/

  const {
    theme,
    themeButton,
    handleThemeButtonClick,
  } = useThemeButton();

  /* ******************** Custom hook for managing Search querying from ConsoleNav to Console *********/
  
  const {
    jsonString,
    searchQuery,
    handleSearchChange
  } = useSearch(logs);


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <Splash />
        }
        />
        <Route path="/credentials" element=
          {
            <Credentials
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              setAccessKey={setAccessKey}
              accessKey={accessKey}
              setSecretKey={setSecretKey}
              secretKey={secretKey}
              setRegion={setRegion}
              region={region}
              getLogs={fetchLogs}
              getLogGroups={fetchLogGroups}
              emptyRegion={emptyRegion}
              isLoading={isLoading}
            />
          }
        /> 
        <Route
          path="/console"
          element={
            <>
              <ConsoleNav
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
              <Console jsonString={jsonString} theme={theme} />
            </>
          }
        />
      </Routes>
    </Router>
  );
};









export default App;


