import React from 'react';
import {useState, useEffect} from 'react'
import Header from './Header.jsx';
import Console from './Console.jsx'
import '../src/styles.css';
import { stackoverflowDark, stackoverflowLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const App = () => {

  /*********************** Initialize State for Entry Point  ***************************/
  const [accessKey, setAccessKey] = useState("AKIAYTC76N32AJC4NBCG");
  const [secretKey, setSecretKey] = useState("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");
  const [region, setRegion] = useState("us-east-1");
  const [logGroups, setLogGroups] = useState('');
  const [stream, setStream] = useState('');
  
  // theme choosing
  const [theme, setTheme] = useState(stackoverflowDark);
  const [themeButton, setThemeButton] = useState('Light Mode');


  /* ***************************** Fetch STREAMS State  ************************ */

  async function getLogs (accKey, secKey, reg) {
    const queryParams = new URLSearchParams({
      accessKey: encodeURIComponent(accKey),
      secretKey: encodeURIComponent(secKey),
      region: encodeURIComponent(reg)
    }).toString();
    const url = `http://localhost:8080/logs`;

    try {
    const response = await fetch(url, {
      method: 'GET', // Assuming the endpoint is expecting a GET request
      headers: {
        'Content-Type': 'application/json',
        'Access-Key': encodeURIComponent(accKey),
        'Secret-Key': encodeURIComponent(secKey),
        'AWS-Region': encodeURIComponent(reg),
      }
    });
    console.log("in use Effect")
    const data = await response.json()
    setStream(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const accKey = accessKey
    const secKey = secretKey
    const reg = region
    getLogs(accKey, secKey, reg)
  }, []);

/* ***************************** Fetch Log Groups State  ************************ */

async function getLogGroups (accKey, secKey, reg) {
  const queryParams = new URLSearchParams({
    accessKey: encodeURIComponent(accKey),
    secretKey: encodeURIComponent(secKey),
    region: encodeURIComponent(reg)
  }).toString();
  const url = `http://localhost:8080/loggroups`;

  try {
  const response = await fetch(url, {
    method: 'GET', // Assuming the endpoint is expecting a GET request
    headers: {
      'Content-Type': 'application/json',
      'Access-Key': encodeURIComponent(accKey),
      'Secret-Key': encodeURIComponent(secKey),
      'AWS-Region': encodeURIComponent(reg),
    }
  });
  console.log("in use Effect")
  const data = await response.json()
  setLogGroups(data)
  } catch (error) {
    console.log(error)
  }
}

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
    <>
        <Header />
        <Console
          handleThemeButtonClick = {handleThemeButtonClick} 
          themeButton = {themeButton}
          jsonObject={stream}
          theme = {theme}
        />
    </>
  );
};


export default App;