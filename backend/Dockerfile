# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu proyecto
COPY package*.json ./
RUN npm install

COPY . .

# Expone el puerto que usa tu app (ajusta si no es 3000)
EXPOSE 3000

# Comando para iniciar tu app
CMD ["npm", "start"]
