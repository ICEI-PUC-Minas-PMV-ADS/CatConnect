import React, { useState } from "react";
import Cat from "../../images/cat.png";
import Circle from "../../images/circle.png";
import Ellipse from "../../images/ellipse.png";
import Logo from "../../images/logo-sos-gatinhos.png";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./Login.css";

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  function toggleRegister() {
    setIsRegister(!isRegister);
  }
  return (
    <div className="page">
      <img className="ellipse" src={Ellipse} alt="ellipse" />
      <img className="circle" src={Circle} alt="circle" />
      <img className="cat" src={Cat} alt="cat" />
      <img className="logo" src={Logo} alt="logo" />
      {!isRegister && (
          <LoginForm toggleRegister={toggleRegister} />
      )}
      {isRegister && (
          <RegisterForm toggleRegister={toggleRegister} />
      )}
    </div>
  );
}

export default LoginPage;
