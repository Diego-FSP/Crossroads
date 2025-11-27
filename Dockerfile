FROM node:18

WORKDIR /app

# copiar solo la carpeta del backend
COPY hoteles ./hoteles

# entrar a la carpeta y instalar dependencias
WORKDIR /app/hoteles
RUN npm install

EXPOSE 3000

# iniciar backend directamente sin usar "cd"
CMD ["npm", "start"]
