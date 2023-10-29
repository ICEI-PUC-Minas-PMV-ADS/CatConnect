# 4. Planos de Testes de _Software_

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

Os testes funcionais a serem realizados na aplicação são descritos abaixo.

Requisitos para realização dos testes:
- Aplicação publicada na plataforma escolhida;
- Conexão com a internet para conseguir acessar a aplicação.

Quadro 6 - Plano de Testes

| Caso de Teste         | CT 01 - Registro de Gatos |
|-----------------------|-------|
| Requisitos Associados | RF 001 - Registro de Gatos |
| Objetivo do Teste     | - Permitir o cadastro do chip do gato, incluindo um número único para identificação. <br> - Capturar informações como nome, foto, status FIV, status FeLV, status da castração e características físicas e comportamentais do gato. <br> - Registrar a data de entrada do gato no sistema. <br> - Disponibilizar campo para adicionar em qual ponto do parque o gato foi localizado. |
| Passos                | aaaaa |
| Critério de Êxito     | - Confirmação do cadastro |

| Caso de Teste         | CT 02 - Registro de Adotantes |
|-----------------------|-------|
| Requisitos Associados | RF 002 - Registro de Adotantes |
| Objetivo do Teste     | - Registrar a data de adoção do gato. <br> - Capturar informações do adotante, incluindo Nome do Adotante, Endereço Residencial, Bairro, Cidade/Estado, CEP, RG, CPF, Profissão, Estado Civil, Fone Fixo, Fone Celular, e-mail obrigatório do adotante. <br> - Associar o gato ao adotante correspondente. <br> - Registrar o status do acompanhamento com o adotante (a fazer, contato feito, foto enviada, foto não enviada/enviada incorretamente). |
| Passos                | aaaaa |
| Critério de Êxito     | - Confirmação do registro 

| Caso de Teste         | CT 03 - Registro de Adoção |
|-----------------------|-------|
| Requisitos Associados | RF 002 - Registro de Adoção |
| Objetivo do Teste     | - Registrar a data de adoção do gato. <br> - Capturar informações da adoção, incluindo Nome do Adotante e gato, data, status e reponsável. <br> - Associa o gato ao adotante correspondente. <br> - Registrar o status do acompanhamento com o adotante (pendente, em andamento, concluido). |
| Passos                |Efetue o login/ clique em adoção no menu lateral esquerdo/ agora edite/ exclua ou crie uma nova adoção |
| Critério de Êxito     | - Confirmação do registro |

| Caso de Teste         | CT 04 - Edição de Informações |
|-----------------------|-------|
| Requisitos Associados | RF 004 - Edição de Informações |
| Objetivo do Teste     | - Possibilitar a edição de todas as informações do gato, incluindo Nome do Animal, Raça, Idade, Espécie (Canina/Felina), Cor da Pelagem, Sexo, Vacinado, Porte (indicar somente caninos), Castrado, Vermifugado nos últimos 3 meses, Observações, e Endereço onde ficará o animal. <br> - Permitir a atualização dos dados do adotante, como telefone, endereço e e-mail. |
| Passos                | aaaaa |
| Critério de Êxito     | - Confirmação da edição das informações |

| Caso de Teste         | CT 05 - Relatórios |
|-----------------------|-------|
| Requisitos Associados | RF 005 - Relatórios |
| Objetivo do Teste     | - Disponibilizar no dashboard um botão para emissão de relatório em formato Excel para auxílio e controle de adoção dos gatos. |
| Passos                | aaaaa |
| Critério de Êxito     | - Apresentar o relatório |

Fonte: Elaborado pelos autores

 
## 4.1 Evidências de Testes de _Software_

Apresente imagens e/ou vídeos que comprovam que um determinado teste foi executado, e o resultado esperado foi obtido. Normalmente são screenshots de telas, ou vídeos do software em funcionamento.

Relatório com os resultados obtidos nos teste de _software_ realizados na aplicação pela equipe, baseado no plano de testes pré-definido anteriormente.

### 4.1.1 Avaliação

Quadro 7 - Registro dos Testes

| Caso de Teste | Ação                  | Resultado Esperado | Resultado Obtido |
|---------------|-----------------------|--------------------|------------------|
| CT 01         | Registro de Gatos     | Permitir que o usuário registre os gatos conforme objetivos estabelecidos. | Sistema em desenvolvimento (quando finalizado, inserir vídeo) |
| CT 02         | Registro de Adotantes    | Permitir que o usuário registre os adotantes conforme objetivos estabelecidos. | Sistema em desenvolvimento (quando finalizado, inserir vídeo) |
| CT 03         | Registro de Adoção    | Permitir que o usuário registre as adoções conforme objetivos estabelecidos. | Sistema estáeditando confrome desejado, excluindo as adoções e criando com êxito. ([Gravação de tela de 29-10-2023 14:57:55.webm](https://github.com/ICEI-PUC-Minas-PMV-ADS/CatConnect/assets/75712250/04f01423-1ffc-4273-9c2c-ef7da3e75e73)) |
| CT 04         | Edição de Informações | Permitir que o usuário edite as informações conforme objetivos estabelecidos. | Sistema em desenvolvimento (quando finalizado, inserir vídeo) |
| CT 05         | Relatórios            | Permitir que ao usuário emitir os relatórios conforme objetivos estabelecidos. | Sistema em desenvolvimento (quando finalizado, inserir vídeo) |

Fonte: Elaborado pelos autores


### 4.1.2 Relatório

Quadro 8 - Resultado

| Caso de Teste | Ação                  | Relatório                  |
|---------------|-----------------------|----------------------------|
| CT 01         | Registro de Gatos     | Sistema em desenvolvimento |
| CT 02         | Registro de Adotantes   | Sistema em desenvolvimento |
| CT 03         | Registro de Adoção | Sistema cria adoções, cria adotante caso cpf não exista, exlui e edita. |
| CT 04         | Edição de Informações | Sistema em desenvolvimento |
| CT 05         | Relatórios            | Sistema em desenvolvimento |

Fonte: Elaborado pelos autores
