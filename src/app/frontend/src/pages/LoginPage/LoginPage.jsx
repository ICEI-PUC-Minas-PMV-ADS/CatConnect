import React, { useState } from "react";
import Cat from "../../images/cat.png";
import Circle from "../../images/circle.png";
import Ellipse from "../../images/ellipse.png";
import Logo from "../../images/logo-sos-gatinhos.png";
import LoginForm from "./LoginForm";
import "./Login.css";
import RegisterForm from "./RegisterForm";

function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  function toggleRegister() {
    setIsRegister(!isRegister);
  }
  return (
    <div className="page">
      <img class="ellipse" src={Ellipse} alt="ellipse" />
      <img class="circle" src={Circle} alt="circle" />
      <img class="cat" src={Cat} alt="cat" />
      <img class="logo" src={Logo} alt="logo" />
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
