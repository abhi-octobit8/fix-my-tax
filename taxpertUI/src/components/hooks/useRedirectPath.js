import React from "react";
import { useNavigate } from "react-router-dom";

const useRedirectPath = () => {
  const navigation = useNavigate();

  const goTo = (to) => navigation(to);

  return { goTo };
};

export default useRedirectPath;
