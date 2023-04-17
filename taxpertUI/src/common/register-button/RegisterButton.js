import React from "react";
import { Button, Col, Row } from "antd";
import { doLogout } from "../../store/authentication/AuthActions";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../shared/Route";

import "./RegisterButton.css";
import { USER_ROLE } from "../../components/application/application-menu/constant";
import useUserRole from "../../components/hooks/useUserRole";
const RegisterButton = ({ ...props }) => {
  const navigate = useNavigate();
  return (
    <>
      <div style={props.style} className="register-button">
        <Button
          className="register-button-control"
          type="primary"
          onClick={() => {
            doLogout();
            navigate(PATH.LOGIN);
          }}
        >
          Register Or Login As a Assessee
        </Button>
      </div>
    </>
  );
};

export default RegisterButton;
