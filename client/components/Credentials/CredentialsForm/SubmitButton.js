import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SubmitButton({
  authenticated,
  getLogGroups,
  setAuthenticated,
  setHasClickedSubmit,
  hasClickedSubmit,
}) {
  const navigate = useNavigate();

  const handleClick = async () => {
    setHasClickedSubmit(true);
    if (authenticated && hasClickedSubmit) {
      navigate('/console');
    }
  };

  return <button onClick={handleClick}>Submit</button>;
}

export default SubmitButton;
