// hooks/useLogGroups.js
import { useState, useEffect, useCallback } from "react";

function useLogGroups(accessKey, secretKey, region, setAuthenticated) {
  const [logGroups, setLogGroups] = useState([]);
  const [selectedLogGroup, setSelectedLogGroup] = useState("");
  const [emptyRegion, setEmptyRegion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLogGroups = useCallback(
    async (setAuthenticated) => {
      setIsLoading(true);
      setEmptyRegion(false);
      const url = "http://localhost:8080/credentials/loggroups";

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
          setIsLoading(false);
          return;
        }
        const data = await response.json();
        if (!data.length) {
          setAuthenticated(false);
          setEmptyRegion(true);
          setIsLoading(false);
          return;
        }
        console.log(data);
        setLogGroups(data);
        setAuthenticated(true);
        setIsLoading(false);
        return;
      } catch (err) {
        console.error("Failed to fetch log groups:", err);
      }
    },
    [accessKey, secretKey, region, setAuthenticated]
  );

  useEffect(() => {
    if (accessKey && secretKey && region) {
      fetchLogGroups(setAuthenticated);
    }
  }, [accessKey, secretKey, region, fetchLogGroups]);

  return {
    logGroups,
    selectedLogGroup,
    setSelectedLogGroup,
    fetchLogGroups,
    emptyRegion,
    isLoading,
  };
}

export default useLogGroups;
