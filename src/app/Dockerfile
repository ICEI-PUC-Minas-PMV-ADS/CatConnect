# Usa a imagem base do Node.js
FROM node:14

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json (se existirem)
COPY package*.json ./

# Instala as dependências
RUN npm install


# Copia o restante do código-fonte do contexto do build
COPY frontend .
COPY server .

# Define um volume para armazenar dados fora do contêiner
VOLUME /usr/src/app/data
# Define um segundo volume para armazenar logs
VOLUME /usr/src/app/logs

# Comando para iniciar o aplicativo React.js
CMD ["npm", "start"]
