function useSelectStream(setSelectedLogStream) {
  function handleSelectStreamChange(e) {
    setSelectedLogStream(e.target.value);
  }
  return {
    handleSelectStreamChange,
  };
}

export default useSelectStream;
