import React from 'react';
import {useState, useEffect, useCallback} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header.jsx';
import Console from './Console.jsx'
import '../src/styles.css';
import { stackoverflowDark, stackoverflowLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Credentials from './Credentials.jsx';
import ConsoleNav from './ConsoleNav.jsx';


const App = () => {

  /*********************** Initialize State for Entry Point  ***************************/
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [region, setRegion] = useState("");
  const [logGroups, setLogGroups] = useState('');
  const [stream, setStream] = useState('NO LOGS REQUESTED YET');
  const [logStreams, setLogStreams] = useState('');
  // theme choosing
  const [theme, setTheme] = useState(stackoverflowDark);
  const [themeButton, setThemeButton] = useState('Light Mode');
  const [selectedLogGroup, setSelectedLogGroup] = useState("")
  const [selectedLogStream, setSelectedLogStream] = useState("")


  /* ***************************** Fetch STREAMS State  ************************ */

  const getLogs = useCallback(async () => {
    const queryParams = new URLSearchParams({
    logGroup: encodeURIComponent(selectedLogGroup),
    logStream: encodeURIComponent(selectedLogStream),
    accessKey: encodeURIComponent(accessKey),
    secretKey: encodeURIComponent(secretKey),
    region: encodeURIComponent(region)
    }).toString();
    const url = `http://localhost:8080/logs`;

    try {
    const response = await fetch(url, {
      method: 'GET', // Assuming the endpoint is expecting a GET request
      headers: {
        'Content-Type': 'application/json',
        'Access-Key': encodeURIComponent(accessKey),
      'Secret-Key': encodeURIComponent(secretKey),
      'AWS-Region': encodeURIComponent(region),
      'Log-Group': encodeURIComponent(selectedLogGroup),
      "Log-Stream": encodeURIComponent(selectedLogStream)
      }
    });
    console.log("in use Effect")
    const data = await response.json()
    setStream(data)
    } catch (error) {
      console.log(error)
    }
  }, [selectedLogGroup, selectedLogStream, accessKey, secretKey, region]);

  useEffect(() => {
    if (accessKey && secretKey && region) {
      getLogGroups();
    }
  }, [getLogGroups, accessKey, secretKey, region]);

  // useEffect(() => {
  //   const accKey = accessKey
  //   const secKey = secretKey
  //   const reg = region
  //   getLogs(accKey, secKey, reg)
  // }, []);

/* ***************************** Fetch Log Groups State  ************************ */

const getLogGroups = useCallback(async () => {
  const queryParams = new URLSearchParams({
    accessKey: encodeURIComponent(accessKey),
    secretKey: encodeURIComponent(secretKey),
    region: encodeURIComponent(region)
  }).toString();
  const url = `http://localhost:8080/loggroups`;

  try {
  const response = await fetch(url, {
    method: 'GET', // Assuming the endpoint is expecting a GET request
    headers: {
      'Content-Type': 'application/json',
      'Access-Key': encodeURIComponent(accessKey),
      'Secret-Key': encodeURIComponent(secretKey),
      'AWS-Region': encodeURIComponent(region),
    }
  });
  console.log("in use Effect")
  const data = await response.json()
  setLogGroups(data)
  console.log("log Groups:", logGroups)
  } catch (error) {
    console.log(error)
  }
}, [accessKey, secretKey, region])

useEffect(() => {
  if (selectedLogGroup) {
    getLogStreams();
  }
}, [selectedLogGroup, getLogStreams]);

// useEffect(() => {
//   const accKey = accessKey
//   const secKey = secretKey
//   const reg = region
//   getLogGroups(accKey, secKey, reg)
// }, []);

/* ***************************** Fetch Log Streams State  ************************ */

const getLogStreams = useCallback(async () => {
  const queryParams = new URLSearchParams({
    logGroup: encodeURIComponent(selectedLogGroup),
    accessKey: encodeURIComponent(accessKey),
    secretKey: encodeURIComponent(secretKey),
    region: encodeURIComponent(region)
  }).toString();
  const url = `http://localhost:8080/logstreams`;

  try {
  const response = await fetch(url, {
    method: 'GET', // Assuming the endpoint is expecting a GET request
    headers: {
      'Content-Type': 'application/json',
      'Access-Key': encodeURIComponent(accessKey),
      'Secret-Key': encodeURIComponent(secretKey),
      'AWS-Region': encodeURIComponent(region),
      'Log-Group': encodeURIComponent(selectedLogGroup)
    }
  });
  console.log("in use Effect")
  const data = await response.json()
  setLogStreams(data)
  console.log("log Streams:", logStreams)
  } catch (error) {
    console.log(error)
  }
}, [selectedLogGroup, accessKey, secretKey, region])


useEffect(() => {
  if (selectedLogStream) {
    getLogs();
  }
}, [selectedLogStream, getLogs]);
// useEffect(() => {
//   const accKey = accessKey
//   const secKey = secretKey
//   const reg = region
//   getLogGroups(accKey, secKey, reg)
// }, []);

  /* ******************** THEME BUTTON CLICK HANDLER  ******************* */

  const handleThemeButtonClick = () => {
    theme === stackoverflowDark 
      ? (setTheme(stackoverflowLight), setThemeButton('Dark Mode')) 
      : (setTheme(stackoverflowDark), setThemeButton('Light Mode'))
  }

  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Credentials
          setAccessKey={setAccessKey}
          accessKey={accessKey}
          setSecretKey={setSecretKey}
          secretKey={secretKey}
          setRegion={setRegion}
          region={region}
          getLogs={getLogs}
          getLogGroups={getLogGroups}/>}/>
          <Route path="/console" element={
    <>
      <ConsoleNav 
      getLogs={getLogs}
      getLogStreams={getLogStreams}
      logStreams={logStreams}
      setSelectedLogStream={setSelectedLogStream}
      selectedLogStream={selectedLogStream}
      selectedLogGroup={selectedLogGroup}
      setSelectedLogGroup={setSelectedLogGroup}
      handleThemeButtonClick={handleThemeButtonClick} 
      themeButton={themeButton}
      logGroups={logGroups}
      />
      <Console
        jsonObject={stream}
        theme={theme}
      />
    </>
  } />
        </Routes>
        
    </Router>
  );
};


export default App;