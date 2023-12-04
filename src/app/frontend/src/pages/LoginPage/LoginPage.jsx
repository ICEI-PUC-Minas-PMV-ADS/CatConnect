import React, { useState } from "react";
import Cat from "../../images/cat.png";
import Circle from "../../images/circle.png";
import Ellipse from "../../images/ellipse.png";
import Logo from "../../images/logo-sos-gatinhos.png";
import LoginForm from "./LoginForm";
import ResetForm from "./ResetForm";
import "./Login.css";

function LoginPage() {
    const [isReset, setIsReset] = useState(false);

    function toggleLogin() {
        setIsReset(!isReset);
    }

    function toggleReset() {
        setIsReset(!isReset);
    }

    return (
        <div className="page">
            <img className="ellipse" src={Ellipse} alt="ellipse" />
            <img className="circle" src={Circle} alt="circle" />
            <img className="cat" src={Cat} alt="cat" />
            <img className="logo" src={Logo} alt="logo" />
            {!isReset ? (
                <LoginForm toggleLogin={toggleLogin} />
            ) : (
                <ResetForm toggleReset={toggleReset} />
            )}
        </div>
    );
}

export default LoginPage;
