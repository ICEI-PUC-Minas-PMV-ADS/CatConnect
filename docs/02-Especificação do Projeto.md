# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Arquitetura e Tecnologias

o	Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas

Colocar a imagem do modelo construído apresentando a proposta de solução.

> **Links Úteis**:
> Disponíveis em material de apoio do projeto

## Requisitos para o Sistema de Gerenciamento de Adoção de Gatos

Neste documento, são apresentados os requisitos funcionais e não funcionais para o desenvolvimento do Sistema de Gerenciamento de Adoção de Gatos. O sistema tem como objetivo facilitar o registro, acompanhamento e gerenciamento de adoções de gatos, fornecendo uma plataforma eficaz e segura para conectar adotantes a gatos disponíveis para adoção. Os requisitos foram divididos em categorias de funcionalidades e características para garantir que o sistema atenda às necessidades dos usuários de maneira abrangente e eficiente.

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Registro de Gatos: Permitir o cadastro do chip do gato, incluindo um número único para identificação. Capturar informações como nome, foto, status FIV, status FeLV, status da castração e características físicas e comportamentais do gato. Registrar a data de entrada do gato no sistema. | ALTA | 
|RF-002| Registro de Adoção: Registrar a data de adoção do gato. Capturar informações do adotante, incluindo Nome do Adotante, Endereço Residencial, Bairro, Cidade/Estado, CEP, RG, CPF, Profissão, Estado Civil, Fone Fixo, Fone Celular, e-mail obrigatório do adotante. Associar o gato ao adotante correspondente. Registrar o status do acompanhamento com o adotante (a fazer, contato feito, foto enviada, foto não enviada/enviada incorretamente).  | ALTA |
|RF-003| Edição de Informações: Possibilitar a edição de todas as informações do gato, incluindo Nome do Animal, Raça, Idade, Espécie (Canina/Felina), Cor da Pelagem, Sexo, Vacinado, Porte (indicar somente caninos), Castrado, Vermifugado nos últimos 3 meses, Observações, e Endereço onde ficará o animal. Permitir a atualização dos dados do adotante, como telefone, endereço e e-mail. | ALTA | 
### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Usabilidade: A interface deve ser intuitiva e fácil de usar, permitindo que os usuários se adaptem rapidamente. A interface deve destacar à primeira vista a foto, nome, status de saúde e status de adoção do gato.	| MÉDIA | 
|RNF-002| Performance: O sistema deve responder rapidamente durante a busca e exibição de informações dos gatos e adotantes.	|  ALTA | 
|RNF-003| Segurança e Privacidade: As informações pessoais dos adotantes devem ser armazenadas de forma segura e confidencial. Apenas usuários autorizados devem ter acesso ao sistema.	|  ALTA | 
|RNF-004| Escalabilidade: O sistema deve ser capaz de lidar com um grande número de registros de gatos e adotantes, considerando o volume significativo de adoções.	|  ALTA | 
|RNF-005| Personalização: Permitir a edição e personalização dos perfis de gatos com imagens e características únicas.	|  MÉDIA | 
|RNF-006| Disponibilidade: Garantir que o sistema esteja disponível a maior parte do tempo, uma vez que os usuários poderão acessá-lo em diferentes momentos.	 |  BAIXA | 
|RNF-007| Atualização: Deve ser possível realizar atualizações frequentes no sistema para adicionar recursos adicionais e melhorias com base no feedback dos usuários.|  MÉDIA | 


## Restrições

Neste documento, apresentamos as restrições que guiarão o processo de desenvolvimento do sistema de Gerenciamento de Relacionamento com o Cliente (CRM) utilizando as tecnologias Node.js, React.js e MongoDB. Essas restrições garantirão a segurança, desempenho, escalabilidade e conformidade do sistema, enquanto aproveitam as vantagens dessas tecnologias modernas e poderosas.

- Node.js (Backend):

|ID| Considerações                                         | Descrição|
|--|-------------------------------------------------------|----------|
|01| APIs RESTful | 	Utilize o Node.js para criar APIs RESTful que gerenciem as interações entre o frontend e o banco de dados. |
|02| Express.js	| Considere usar o framework Express.js para facilitar o desenvolvimento do servidor e das rotas da API.         |
|03| Segurança	|  Implemente práticas de segurança como proteção contra injeção de SQL, autenticação e autorização.         |
|04| Integrações	| Aproveite a flexibilidade do Node.js para integrar APIs de terceiros, como serviços de pagamento ou geolocalização.        |

- React.js (Frontend):

|ID| Considerações                                         | Descrição|
|--|-------------------------------------------------------|----------|
|01| Componentização | Divida a interface em componentes independentes para facilitar o desenvolvimento e manutenção.|
|02| State Management	| Use Redux ou Context API para gerenciar o estado global e compartilhar dados entre componentes.        |
|03| Roteamento	 |  Utilize uma biblioteca de roteamento como o React Router para criar uma navegação fluida.         |
|04| Estilização	| Considere usar styled-components ou CSS Modules para criar estilos de forma modular.      |
|05| Responsividade	| 	Garanta que a interface seja responsiva para acessos em dispositivos móveis e desktops.        |

- MongoDB (Banco de Dados):

|ID| Considerações                                         | Descrição|
|--|-------------------------------------------------------|----------|
|01| NoSQL Database	 | O MongoDB é um banco de dados NoSQL, portanto, planeje o design do banco de dados de acordo com essa estrutura. |
|02| Esquema Flexível		|Aproveite o esquema flexível do MongoDB para adaptar-se às mudanças nos requisitos sem alterar a estrutura do banco de dados.      |
|03| Índices Eficientes	|  Configure índices apropriados para melhorar o desempenho das consultas e pesquisas.       |
|04| Gerenciamento de Dados	| Considere estratégias para o gerenciamento de dados, como a exclusão de registros antigos ou a compactação do banco.     |
|04| Segurança	| Configure autenticação e controle de acesso adequados ao MongoDB para proteger seus dados.     |
|04| Backup e Restauração		| Implemente rotinas de backup regulares e teste procedimentos de restauração para garantir a recuperação de dados em caso de falhas.    |




## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Modelo de Dados

O Modelo de dados escolhido foi o NoSQL do tipo documento. Esse modelo foi definido pensando no grande volume de dados demandados pela aplicação. Segue abaixo a representação do Modelo:

![MD SOS Gatinhos do Parque](https://github.com/ICEI-PUC-Minas-PMV-ADS/Grupo4Turma-2/assets/91228798/616e0b07-8c28-4170-834f-400c7316e717)

Também pode ser acessado clicando <a href="https://lucid.app/lucidchart/81243027-bc05-48b8-bc63-2d3e55851eec/edit?viewport_loc=191%2C-182%2C1623%2C865%2C0_0&invitationId=inv_23f15e69-f1ff-408f-b004-d341a9c271b5">aqui</a>.

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.
