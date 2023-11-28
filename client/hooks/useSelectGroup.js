function useSelectGroup(setSelectedLogGroup) {
  function handleSelectChange(e) {
    setSelectedLogGroup(e.target.value);
  }
  return {
    handleSelectChange,
  };
}

export default useSelectGroup;
