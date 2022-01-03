FROM node

WORKDIR /usr/app

COPY package.json ./

COPY .env ./

COPY .env.test ./

RUN npm install

COPY . .

expose 3000

CMD ["npm", "run", "start"]
