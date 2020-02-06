FROM node:11.2-slim

WORKDIR /app


COPY . .
COPY .env ./.env
COPY package.json package.json

RUN npm install
#RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]

USER node