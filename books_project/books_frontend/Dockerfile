FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci && npm i -g typescript

COPY . .

CMD ["npm", "run", "build"]
