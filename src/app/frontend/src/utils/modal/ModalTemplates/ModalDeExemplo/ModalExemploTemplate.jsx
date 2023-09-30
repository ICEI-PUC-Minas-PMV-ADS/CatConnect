import React from "react";
import "./ModalExemploTemplate.css";

function ModalDeExemplo({ closeModal }) {
  const handleSubmit = async () => {
    console.log("Modal de exemplo fechado");
    closeModal();
  };

  return (
    <div className="adocao-container">
      <form onSubmit={(e) => handleSubmit(e)} className="adocao-dados">
        <div className="adocao-linha">
          <div className="adocao-coluna">
            <label>Input de exemplo</label>
            <input
              type="nome"
              name="nome"
              placeholder="Digite o nome da pessoa"
            />
          </div>
        </div>
        <div className="adocao-linha">
          <div className="adocao-coluna">
            <label>RG</label>
            <input
              type="rg"
              placeholder="Digite o RG"
              name="rg"
            />
          </div>
          <div className="adocao-coluna">
            <label>CPF</label>
            <input
              type="cpf"
              placeholder="Digite o CPF"
              name="cpf"
            />
          </div>
        </div>
        <div className="adocao-linha">
          <div className="adocao-coluna">
            <h5>texto de exemplo na coluna 1</h5>
          </div>
          <div className="adocao-coluna">
            <h5>texto de exemplo na coluna 2</h5>
          </div>
          <div className="adocao-coluna">
            <h5>texto de exemplo na coluna 3</h5>
          </div>
        </div>
        <button type="submit">Fechar modal de exemplo</button>
      </form>
    </div>
  );
}

export default ModalDeExemplo;
