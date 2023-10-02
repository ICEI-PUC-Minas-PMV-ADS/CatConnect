import React from "react";
import "./AdotantesModal.css";

function AdotantesModal({ handleSubmitFunction, adotante, edit, setAdotante }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdotante((prevAdotante) => ({
      ...prevAdotante,
      [name]: value,
    }));
  };
  //Qualquer hook a ser usado, terá error (ver no console), caso ocorra, enviar o hook via props
  const handleSubmit = (e) => {
    //TODO: Editar adotante no banco
    e.preventDefault();
    handleSubmitFunction();
  };

  return (
    <div className="adotante-container">
      <form onSubmit={(e) => handleSubmit(e)} className="adotante-dados">
        <div className="adotante-linha">
          <div className="adotante-coluna">
            <label>Nome da pessoa</label>
            <input
              type="nome"
              name="nome"
              placeholder="Digite o nome da pessoa"
              disabled={!edit}
              value={adotante?.nome}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="adotante-linha">
          <div className="adotante-coluna">
            <label>RG</label>
            <input
              type="rg"
              placeholder="Ex: MG12123123"
              name="rg"
              disabled={!edit}
              value={adotante?.rg}
              onChange={handleInputChange}
            />
          </div>
          <div className="adotante-coluna">
            <label>CPF</label>
            <input
              type="cpf"
              placeholder="Ex: 1212312312"
              name="cpf"
              disabled={!edit}
              value={adotante?.cpf}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="adotante-linha">
          <div className="adotante-coluna">
            <label>Telefone</label>
            <input
              type="telefone"
              placeholder="(31)912345678"
              name="telefone"
              disabled={!edit}
              value={adotante?.telefone}
              onChange={handleInputChange}
            />
          </div>
          <div className="adotante-coluna">
            <label>Instagram</label>
            <input
              type="instagram"
              placeholder="Ex: @sosgatinhosdoparque"
              name="instagram"
              disabled={!edit}
              value={adotante?.instagram}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="adotante-linha">
          <div className="adotante-coluna">
            <label>Endereço</label>
          </div>
        </div>
        <div className="adotante-linha">
          <div className="adotante-coluna">
            <label>Rua</label>
            <input
              type="rua"
              placeholder="Ex: Av. Afonso Pena, 1377"
              name="rua"
              disabled={!edit}
              value={adotante?.rua}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="adotante-linha">
          <div className="adotante-coluna">
            <label>Bairro</label>
            <input
              type="bairro"
              placeholder="Ex: Centro"
              name="bairro"
              disabled={!edit}
              value={adotante?.bairro}
              onChange={handleInputChange}
            />
          </div>
          <div className="adotante-coluna">
            <label>Cidade</label>
            <input
              type="cidade"
              placeholder="Ex: Belo Horizonte"
              name="cidade"
              disabled={!edit}
              value={adotante?.cidade}
              onChange={handleInputChange}
            />
          </div>
          <div className="adotante-coluna">
            <label>CEP</label>
            <input
              type="cep"
              placeholder="Ex: 30130-000"
              name="cep"
              disabled={!edit}
              value={adotante?.cep}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit">
          {!adotante ? "Adicionar" : edit ? "Salvar" : "Fechar"}
        </button>
      </form>
    </div>
  );
}

export default AdotantesModal;
