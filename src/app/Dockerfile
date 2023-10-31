# Use uma imagem base do Node.js 16
FROM node:16

# Crie os diretórios para o frontend e o servidor
WORKDIR /usr/src/app
RUN mkdir frontend
RUN mkdir server

# Copie os arquivos do frontend
COPY frontend /usr/src/app/frontend

# Instale as dependências do frontend
WORKDIR /usr/src/app/frontend
RUN npm install

# Exponha a porta para o frontend
EXPOSE 3000

# Comando para iniciar o aplicativo frontend
CMD ["npm", "start"]

# Volte para o diretório principal do aplicativo
WORKDIR /usr/src/app

# Copie os arquivos do servidor
COPY server /usr/src/app/server

# Instale as dependências do servidor
WORKDIR /usr/src/app/server
RUN npm install

# Exponha a porta para o servidor
EXPOSE 4000

# Comando para iniciar o servidor
CMD ["npm", "start"]
