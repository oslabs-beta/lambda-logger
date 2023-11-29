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
  }, [authenticated, navigate, hasClickedSubmit]);

  const handleClick = async () => {
    await getLogGroups(setAuthenticated);
    setHasClickedSubmit(true);
    if (authenticated) {
      navigate("/console");
    }
  };

  return <button onClick={handleClick}>Submit</button>;
}

export default SubmitButton;
