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

# Comando para iniciar o servidor Node.js
CMD ["npm", "start"]
