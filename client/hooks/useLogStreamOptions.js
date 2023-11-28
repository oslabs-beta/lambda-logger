import React, { useState, useEffect } from "react";

function useLogStreamOptions(logStreams) {
  const [logStreamOptions, setLogStreamOptions] = useState([]);
  useEffect(() => {
    if (logStreams && Array.isArray(logStreams)) {
      const options = logStreams.map((logStream, index) => (
        <option key={`logStream${index}`} value={logStream}>
          {logStream}
        </option>
      ));
      setLogStreamOptions(options);
    }
  }, [logStreams]);
  return {
    logStreamOptions,
  };
}

export default useLogStreamOptions;
