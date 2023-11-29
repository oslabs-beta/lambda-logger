// hooks/useLogStreams.js
import { useState, useEffect, useCallback } from "react";

function useLogStreams(accessKey, secretKey, region, selectedLogGroup) {
  const [logStreams, setLogStreams] = useState([]);
  const [selectedLogStream, setSelectedLogStream] = useState("");

  const fetchLogStreams = useCallback(async () => {
    const url = "http://localhost:8080/credentials/logstreams";

    try {
      const response = await fetch(url, {
        method: "GET", // Assuming the endpoint is expecting a GET request
        headers: {
          "Content-Type": "application/json",
          "Access-Key": encodeURIComponent(accessKey),
          "Secret-Key": encodeURIComponent(secretKey),
          "AWS-Region": encodeURIComponent(region),
          "Log-Group": encodeURIComponent(selectedLogGroup),
        },
      });
      const data = await response.json();
      setLogStreams(data);
    } catch (error) {
      console.error("Failed to fetch log streams:", error);
    }
  }, [accessKey, secretKey, region, selectedLogGroup]);

  useEffect(() => {
    if (selectedLogGroup) {
      fetchLogStreams();
    }
  }, [selectedLogGroup, fetchLogStreams]);

  return {
    logStreams,
    selectedLogStream,
    setSelectedLogStream,
    fetchLogStreams,
  };
}

export default useLogStreams;
