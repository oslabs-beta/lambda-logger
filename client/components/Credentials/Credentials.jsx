import React from 'react';
import CredentialsForm from './CredentialsForm/CredentialsForm.jsx';
import styles from '../../src/styles/Credentials.module.css';
import useRegions from '../../hooks/useRegions';


export default function Credentials({setAccessKey, setSecretKey, setRegion, accessKey, secretKey, region, getLogGroups, setAuthenticated, authenticated}) {

  const { regionOptions } = useRegions();

  return (
    <div className={styles.Credentials}>
      <h3>Enter Credentials</h3>
      <CredentialsForm
        authenticated={authenticated}
        accessKey={accessKey}
        secretKey={secretKey}
        region={region}
        setAccessKey={setAccessKey}
        setSecretKey={setSecretKey}
        setRegion={setRegion}
        regionOptions={regionOptions}
        getLogGroups={getLogGroups}
        setAuthenticated={setAuthenticated}
      />
    </div>
  );
}