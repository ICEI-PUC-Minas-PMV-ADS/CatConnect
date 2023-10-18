# Usa a imagem base do Node.js
FROM node:14

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia o package.json e package-lock.json (se existirem)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Define um segundo volume para armazenar logs
VOLUME /usr/src/app/logs

# Comando para iniciar o servidor Node.js
CMD ["npm", "start"]
