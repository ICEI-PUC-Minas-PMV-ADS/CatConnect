import React from "react";
import "./AdicionarAdocaoTemplate.css";

function AdicionarAdocaoTemplate({ closeModal }) { //Qualquer hook a ser usado, terá error (ver no console), caso ocorra, enviar o hook via props
  const handleSubmit = async () => {
    console.log("Adoção completada");
    closeModal();
  };

 const pessoa = { // Se tiver dados já pré-preenchidos, trazer via props
    rg: 321,
    nome: "mariane",
    cpf: 789
 }

  return (
    <div className="adocao-container">
      <form onSubmit={(e) => handleSubmit(e)} className="adocao-dados">
        <div className="adocao-linha">
          <div className="adocao-coluna">
            <label>Nome da pessoa</label>
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
            <input type="rg" placeholder="Digite o RG" name="rg" disabled={pessoa} value={pessoa?.rg} />
          </div>
          <div className="adocao-coluna">
            <label>CPF</label>
            <input type="cpf" placeholder="Digite o CPF" name="cpf" disabled={pessoa} value={pessoa?.cpf} />
          </div>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default AdicionarAdocaoTemplate;
