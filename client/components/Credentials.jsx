//import React, { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../src/styles/Credentials.module.css';
import useRegions from '../hooks/useRegions';


export default function Credentials({setAccessKey, setSecretKey, setRegion, getLogs, accessKey, secretKey, region, getLogGroups}) {

  const { regionOptions } = useRegions();

  return (
    <div className={styles.Credentials}>
      <h3>Enter Credentials</h3>
      <div>
        <form>
          <label>Access Key
            <input type="text" 
              onChange={(e) => setAccessKey(e.target.value)}
            />
          </label>
        </form>
        <form>
          <label>Secret Key
            <input type="text" 
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </label>
        </form>
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          {regionOptions}
        </select>
        <Link to="/console">
          <button onClick={() => getLogGroups(accessKey, secretKey, region)}>
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
}