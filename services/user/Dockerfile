# Fetching the minified node image on apline linux
FROM node:alpine

# Setting up the work directory
WORKDIR /app

# COPY package.json
COPY package*.json /app

# Installing dependencies
RUN npm install


# Copying all the files in our project
COPY prisma ./prisma

RUN npx prisma generate
RUN npx prisma migrate

COPY . .


# Exposing server port
EXPOSE 8085

# Starting our application
CMD [ "npm", "run", "dev" ]