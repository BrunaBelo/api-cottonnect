FROM node

WORKDIR /usr/app

COPY package.json ./

COPY .env ./

COPY .env.test ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "start"]
