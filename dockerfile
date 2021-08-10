FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

expose 3000

CMD ["npm", "run", "start"]
