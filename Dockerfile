FROM node:18

WORKDIR /app

COPY hoteles/package*.json ./

RUN npm install

COPY hoteles ./

EXPOSE 3000

CMD ["npm", "start"]
