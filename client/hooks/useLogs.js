// hooks/useLogs.js
import { useState, useEffect, useCallback } from 'react';

function useLogs(
  accessKey,
  secretKey,
  region,
  selectedLogGroup,
  selectedLogStream
) {
  const [logs, setLogs] = useState('NO LOGS REQUESTED YET');
  const fetchLogs = useCallback(async () => {
    const url = "http://localhost:8080/credentials/logs";

    try {
      const response = await fetch(url, {
        method: 'GET', // Assuming the endpoint is expecting a GET request
        headers: {
          'Content-Type': 'application/json',
          'Access-Key': encodeURIComponent(accessKey),
          'Secret-Key': encodeURIComponent(secretKey),
          'AWS-Region': encodeURIComponent(region),
          'Log-Group': encodeURIComponent(selectedLogGroup),
          'Log-Stream': encodeURIComponent(selectedLogStream),
        },
      });
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  }, [accessKey, secretKey, region, selectedLogGroup, selectedLogStream]);

  useEffect(() => {
    if (selectedLogStream) {
      fetchLogs();
    }
  }, [selectedLogStream, fetchLogs]);

  return {
    logs,
    fetchLogs,
    setLogs,
  };
}

export default useLogs;
