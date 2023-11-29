// hooks/useLogGroups.js
import { useState, useEffect, useCallback } from "react";

function useLogGroups(accessKey, secretKey, region) {
  const [logGroups, setLogGroups] = useState([]);
  const [selectedLogGroup, setSelectedLogGroup] = useState("");

  const fetchLogGroups = useCallback(
    async (setAuthenticated) => {
      const url = "http://localhost:8080/loggroups";

      try {
        const response = await fetch(url, {
          method: "GET", // Assuming the endpoint is expecting a GET request
          headers: {
            "Content-Type": "application/json",
            "Access-Key": encodeURIComponent(accessKey),
            "Secret-Key": encodeURIComponent(secretKey),
            "AWS-Region": encodeURIComponent(region),
          },
        });
        if (!response.ok) {
          const errorData = await response.json(); // Parse error response
          setAuthenticated(false);
          return;
        }
        const data = await response.json();
        setLogGroups(data);
        setAuthenticated(true);
        return;
      } catch (err) {
        console.error("Failed to fetch log groups:", err);
      }
    },
    [accessKey, secretKey, region]
  );

  useEffect(() => {
    if (accessKey && secretKey && region) {
      fetchLogGroups();
    }
  }, [accessKey, secretKey, region, fetchLogGroups]);

  return {
    logGroups,
    selectedLogGroup,
    setSelectedLogGroup,
    fetchLogGroups,
  };
}

export default useLogGroups;
