import React, { useState, useEffect } from "react";

function useLogGroupOptions(logGroups) {
  const [logGroupOptions, setLogGroupOptions] = useState([]);
  useEffect(() => {
    if (logGroups && Array.isArray(logGroups)) {
      const options = logGroups.map((logGroup, index) => (
        <option key={`logGroup${index}`} value={logGroup}>
          {logGroup}
        </option>
      ));
      setLogGroupOptions(options);
    }
  }, [logGroups]);
  return {
    logGroupOptions,
  };
}

export default useLogGroupOptions;
