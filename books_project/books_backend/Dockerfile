FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci && npm i -g typescript

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]