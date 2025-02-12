# Usando a imagem oficial do Node.js
FROM node:18

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e package-lock.json antes de instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Compilar TypeScript
RUN npm run build

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
