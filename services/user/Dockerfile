FROM node:alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "pnpm", "run", "start:dev" ]
