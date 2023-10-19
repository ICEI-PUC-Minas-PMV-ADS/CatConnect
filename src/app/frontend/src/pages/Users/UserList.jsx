import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários: ", error);
      }
    };

    fetchUsers();
  }, []); 

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
