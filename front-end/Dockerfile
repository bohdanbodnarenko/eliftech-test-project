FROM node:latest

WORKDIR /app

COPY . .
COPY package.json package.json

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]