import React from 'react';
import {useState, useEffect} from 'react'
import Header from './Header.jsx';
import Console from './Console.jsx'
import '../src/styles.css';

const App = () => {

  /* Initialize State for Entry Point  */
  const [accessKey, setAccessKey] = useState('hi');
  const [secretKey, setSecretKey] = useState('hello');
  const [region, setRegion] = useState('region');
  const [stream, setStream] = useState('');
  const [theme, setTheme] = useState('stackoverflowDark');




  /* ***************************** Fetch State  ************************ */

  async function getLogs (accKey, secKey, reg) {
    const queryParams = new URLSearchParams({
      accessKey: encodeURIComponent(accKey),
      secretKey: encodeURIComponent(secKey),
      region: encodeURIComponent(reg)
    }).toString();
  const url = `http://localhost:8080/logs?${queryParams}`;
    try{
    const response = await fetch(url)
    console.log("in use Effect")
    const data = await response.json()
    setStream(data)
    }
    catch (error){
      console.log(error)
    }
  }
  useEffect(() => {
    const accKey = accessKey
    const secKey = secretKey
    const reg = region
    getLogs(accKey, secKey, reg)
  }, []);


  return (
    <>
        <Header />
        <Console 
        jsonObject={stream}
        theme = {theme}
        />
    </>
  );
};


export default App;