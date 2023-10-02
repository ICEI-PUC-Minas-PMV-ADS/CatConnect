import React from "react";
import "./EditarGato.css";

function EditGato({ closeModal }) { //Qualquer hook a ser usado, terá error (ver no console), caso ocorra, enviar o hook via props
  const handleSubmit = async () => {
    console.log("Gato adicionado com sucesso!");
    closeModal();
  };

 const gato = { // Se tiver dados já pré-preenchidos, trazer via props
    idade: "10 anos",
    nome: "Fifi",
    cor: "Laranja"
 }

  return (
    <div className="gatos-container">
      <form onSubmit={(e) => handleSubmit(e)} className="gato-dados">
        <div className="gato-linha">
          <div className="gato-coluna">
            <label>Nome do gato</label>
            <input
              type="nome"
              name="nome"
              placeholder="Digite o nome do gato" disabled={gato} value={gato?.nome}
            />
          </div>
        </div>
        <div className="gato-linha">
          <div className="gato-coluna">
            <label>Idade</label>
            <input type="idade" placeholder="Digite a idade" name="idade" disabled={gato} value={gato?.idade} />
          </div>
          <div className="gato-coluna">
            <label>Cor</label>
            <input type="cpf" placeholder="Digite a cor" name="cor" disabled={gato} value={gato?.cor} />
          </div>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default EditGato;
