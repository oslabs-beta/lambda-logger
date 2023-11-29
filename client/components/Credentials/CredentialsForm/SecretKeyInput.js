import React from "react";

function SecretKeyInput({ secretKey, setSecretKey }) {
  return (
    <form>
      <label>
        Secret Key
        <input
          type="text"
          onChange={(e) => setSecretKey(e.target.value)}
          value={secretKey}
        />
      </label>
    </form>
  );
}

export default SecretKeyInput;
