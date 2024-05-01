FROM node:20

WORKDIR app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 40001

CMD ["npm", "run", "start:all"]
