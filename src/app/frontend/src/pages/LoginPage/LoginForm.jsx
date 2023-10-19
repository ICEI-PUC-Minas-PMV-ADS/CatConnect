import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import "./Login.css";
import Swal from 'sweetalert2';

function LoginForm({ toggleRegister }) {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          Swal.fire({
            title: "Sucesso",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
          }).then(() => {

            navigate("/");
          });
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="container">
      <h2>Login</h2>
      <p className="sub-text">
        Sistema de acompanhamento de gatos e adoções exclusivo para voluntários
        da SOS Gatinhos do Parque
      </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Digite seu Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Digite sua Senha"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Entrar</button>
        {/*<span>*/}
        {/*  Não possui um conta ?*/}
        {/*  <a onClick={() => toggleRegister()}> Registrar</a>*/}
        {/*</span>*/}
      </form>
    </div>
  );
}

export default LoginForm;
