FROM node:8.11.1-alpine

COPY server ./server
COPY package*.json ./
RUN npm i

WORKDIR /server
CMD ["node", "./index.js"]
