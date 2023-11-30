import { useState, useEffect } from "react";

function useSearch(jsonObject) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredJson = searchQuery
    ? jsonObject.filter((item) =>
        JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : jsonObject;

  const jsonString = JSON.stringify(filteredJson, null, 2);

  return {
    jsonString,
    searchQuery,
    setSearchQuery,
    handleSearchChange,
  };
}

export default useSearch;
