FROM node:18

# crear carpeta de trabajo
WORKDIR /app

# copiar la carpeta del backend
COPY hoteles ./hoteles

# entrar a la carpeta y instalar dependencias
WORKDIR /app/hoteles
RUN npm install

# exponer puerto (recomendado)
EXPOSE 3000

# iniciar backend
CMD ["npm", "start"]
