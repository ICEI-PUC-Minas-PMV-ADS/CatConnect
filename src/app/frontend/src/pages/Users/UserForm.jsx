import React, { useState } from "react";
import axios from "axios";

function UserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/users", {
        email,
        password,
      });

      setEmail("");
      setPassword("");

    } catch (error) {
      console.error("Erro ao criar/atualizar usuário: ", error);
    }
  };

  return (
    <div>
      <h2>Criar/Atualizar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default UserForm;
