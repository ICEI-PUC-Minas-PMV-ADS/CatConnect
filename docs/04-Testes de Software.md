# 4. Planos de Testes de _Software_

São apresentados os cenários de testes utilizados na realização dos testes da aplicação, que demonstram os requisitos sendo satisfeitos. São detalhadas quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

Os testes funcionais a serem realizados na aplicação são descritos abaixo.

Requisitos para realização dos testes:
- Aplicação publicada na plataforma escolhida;
- Conexão com a internet para conseguir acessar a aplicação.

Quadro 6 - Plano de Testes

| Caso de Teste         | CT 01 - Gatos |
|-----------------------|-------|
| Requisitos Associados | RF 001 - Registro de Gatos / RF 003 - Edição de Gatos / RF 011- Relatorio
| Objetivo do Teste     | - Permitir o cadastro do chip do gato, incluindo um número único para identificação. <br> - Capturar informações como nome, foto, status FIV, status FeLV, status da castração e características físicas e comportamentais do gato. <br> - Registrar a data de entrada do gato no sistema. <br> - Disponibilizar campo para adicionar em qual ponto do parque o gato foi localizado. |
| Passos                | 01- Efetue o login <br> 02- clique em gatinhos no menu lateral esquerdo <br> 03- Edite ou crie um novo registro de gato |
| Critério de Êxito     |  - Confirmação do registro e edição sem erro e atualização no banco de dados.|

| Caso de Teste         | CT 02 - Adotantes |
|-----------------------|-------|
| Requisitos Associados | RF 006 - Registro de Adotantes / RF 007 - Edição de Adotantes / RF 011  - Relatorio|
| Objetivo do Teste     | - Registrar a data de adoção do gato. <br> - Capturar informações do adotante, incluindo Nome do Adotante, Endereço Residencial, Bairro, Cidade/Estado, CEP, RG, CPF, Profissão, Estado Civil, Fone Fixo, Fone Celular, e-mail obrigatório do adotante. <br> - Associar o gato ao adotante correspondente. <br> - Registrar o status do acompanhamento com o adotante (a fazer, contato feito, foto enviada, foto não enviada/enviada incorretamente). |
| Passos                | Efetue o login / clique em adotantes no menu lateral esquerd o/ agora edite ou crie um novo adotante  |
| Critério de Êxito     | - Confirmação do registro e edição sem erro. |

| Caso de Teste         | CT 03 - Adoção |
|-----------------------|-------|
| Requisitos Associados | RF 002 - Registro de Adoção / RF 006 - Edição de Adoção / RF 006 - Exclusão de Adoção / RF 011 - Relatorio |
| Objetivo do Teste     | - Registrar a data de adoção do gato. <br> - Capturar informações da adoção, incluindo Nome do Adotante e gato, data, status e reponsável. <br> - Associa o gato ao adotante correspondente. <br> - Registrar o status do acompanhamento com o adotante (pendente, em andamento, concluido). |
| Passos                | 01- Efetue o login <br> 02- clique em adotantes no menu lateral esquerdo <br> 03- Edite ou crie um novo adotante  |
| Critério de Êxito     | - Confirmação do registro, exclusão e edição sem retornos de erro. |

| Caso de Teste         | CT 04 - Usuario |
|-----------------------|-------|
| Requisitos Associados | RF 008 - Registro de Usuario / RF 009 - Edição de Usuario / RF 010 - Exclusão de Usuario / RF 011 - Relatorio |
| Objetivo do Teste     | - Registrar a data do usuario <br> - Excluir usuarios <br> - Editar usuarios <br> |
| Passos                | 01- Efetue o login <br> 02- Clique em adoção no menu lateral esquerdo <br> 03- Edite, exclua ou crie uma nova adoção |
| Critério de Êxito     | - Confirmação do registro, exclusão e edição sem retornos de erro. |


| Caso de Teste         | CT 05 - Relatórios |
|-----------------------|-------|
| Requisitos Associados | RF 005 - Relatórios |
| Objetivo do Teste     | - Disponibilizar no dashboard um botão para emissão de relatório em formato Excel para auxílio e controle de adoção dos gatos. |
| Passos                | aaaaa |
| Critério de Êxito     | - Apresentar o relatório |

Fonte: Elaborado pelos autores

 
## 4.1 Evidências de Testes de _Software_

São apresentadas evidências da realização de testes, bem como o resultado obtido. Em seguida, são avaliados os resultados obtidos em um relatório, com base no plano de testes definido. 

### 4.1.1 Avaliação

Quadro 7 - Registro dos Testes

| Caso de Teste | Ação                  | Resultado Esperado | Resultado Obtido |
|---------------|-----------------------|--------------------|------------------|
| CT 01         | Registro/edição de Gatos     | Permitir que o usuário registre os gatos conforme objetivos estabelecidos. | Sistema em desenvolvimento (quando finalizado, inserir vídeo) |
| CT 02         |  Registro/edição  de Adotantes    | Permitir que o usuário registre os adotantes  e os edite. | Sistema está editando conforme desejado e criando registros sem erros. ([Gravação de tela de 29-10-2023 15:27:07.webm](https://github.com/ICEI-PUC-Minas-PMV-ADS/CatConnect/assets/75712250/54693192-97c7-4460-b579-3cebc5ccfe1a) |
| CT 03         |  Registro/edição/Exclusão de Adoção    | Permitir que o usuário registre as adoções, exclua os cadastros e crie novos cadastros.| Sistema está editando conforme desejado, excluindo as adoções e criando registros sem erros. ([Gravação de tela de 29-10-2023 14:57:55.webm](https://github.com/ICEI-PUC-Minas-PMV-ADS/CatConnect/assets/75712250/04f01423-1ffc-4273-9c2c-ef7da3e75e73)) |
| CT 04         | Registro/edição/Exclusão de  Usuarios | Permitir que o usuário registre nos usuarios, exclua os cadastros e crie novos cadastros.| Sistema está editando conforme desejado, excluindo os usuarios e criando registros sem erros. [Gravação de tela de 29-10-2023 16:38:02.webm](https://github.com/ICEI-PUC-Minas-PMV-ADS/CatConnect/assets/75712250/fb0830b9-07f2-4681-a4e9-8609f17a94bd) |
| CT 05         | Relatórios            | Permitir que ao usuário emitir os relatórios conforme objetivos estabelecidos. | Sistema em desenvolvimento (quando finalizado, inserir vídeo) |

Fonte: Elaborado pelos autores


### 4.1.2 Relatório

Quadro 8 - Resultado

| Caso de Teste | Ação                  | Relatório                  |
|---------------|-----------------------|----------------------------|
| CT 01         | Registro de Gatos     | Sistema cria registros dos gatos, sem retorno de erros ou demora. |
| CT 02         | Registro e edição de Adotantes   | Sistema cria e editar os adotantes sem retorno de erros ou demora. |
| CT 03         | Registro, exclusão e edição de adoções. | Sistema cria adoções, cria adotante caso cpf não exista, exlui e edita. |
| CT 04         | Edição de Informações | Sistema em desenvolvimento |
| CT 05         | Relatórios            | Sistema em desenvolvimento |

Fonte: Elaborado pelos autores
