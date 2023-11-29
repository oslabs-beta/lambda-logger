import React from "react";

function AccessKeyInput({ accessKey, setAccessKey }) {
  return (
    <form>
      <label>
        Access Key
        <input
          type="text"
          onChange={(e) => setAccessKey(e.target.value)}
          value={accessKey}
        />
      </label>
    </form>
  );
}

export default AccessKeyInput;
