import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SubmitButton({
  authenticated,
  getLogGroups,
  setAuthenticated,
  setHasClickedSubmit,
  hasClickedSubmit,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated && hasClickedSubmit) {
      navigate("/console");
    }
  }, [authenticated, hasClickedSubmit, navigate]);

  const handleClick = async () => {
    setHasClickedSubmit(true);
  };

  return <button onClick={handleClick}>Submit</button>;
}

export default SubmitButton;
