# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e o arquivo package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho no contêiner
COPY . .

# Exponha a porta onde a aplicação Quasar irá rodar (porta do Quasar)
EXPOSE 9000

# Comando para rodar o servidor Quasar em modo de desenvolvimento
CMD ["npm", "run", "dev"]
