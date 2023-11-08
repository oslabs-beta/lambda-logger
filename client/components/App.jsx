import React from 'react';
import {useState, useEffect} from 'react'
import Header from './Header.jsx';
import Console from './Console.jsx'

const App = () => {

  /* Initialize State for Entry Point  */
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [region, setRegion] = useState('');

  //need to 
  return (
    <>
        <Header />
        <Console />
    </>
  );
};


export default App;