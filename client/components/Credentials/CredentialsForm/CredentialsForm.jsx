import React, { useEffect, useState } from "react";
import '../../../src/styles/Credentials.module.css';
import AccessKeyInput from "./AccessKeyInput";
import SecretKeyInput from "./SecretKeyInput"; // Create this component similarly
import RegionSelect from "./RegionSelect";
import SubmitButton from "./SubmitButton";

export default function CredentialsForm({
  accessKey,
  secretKey,
  region,
  setAccessKey,
  setSecretKey,
  setRegion,
  regionOptions,
  getLogGroups,
  setAuthenticated,
  authenticated
}) {

  const [hasClickedSubmit, setHasClickedSubmit] = useState(false);

  return (
    <div>
      <AccessKeyInput accessKey={accessKey} setAccessKey={setAccessKey} />
      <SecretKeyInput secretKey={secretKey} setSecretKey={setSecretKey} />
      <RegionSelect
        region={region}
        setRegion={setRegion}
        regionOptions={regionOptions}
      />
      <SubmitButton
        setAuthenticated={setAuthenticated}
        setHasClickedSubmit={setHasClickedSubmit}
        hasClickedSubmit={hasClickedSubmit}
        getLogGroups={getLogGroups}
        authenticated={authenticated}
        accessKey={accessKey}
        secretKey={secretKey}
        region={region}
      />
      {hasClickedSubmit && !authenticated && (
        <>
          <br />
          <div style={{ color: "yellow" }} id="authMessage">Credentials Not Accepted</div>
        </>
      )}
    </div>
  );
}

