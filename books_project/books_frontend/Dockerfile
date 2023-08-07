FROM node:20

VOLUME /var/src/app/dist/books_frontend

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci && npm i -g typescript

COPY . .

#RUN npm run build

CMD ["npm", "run", "build"]
