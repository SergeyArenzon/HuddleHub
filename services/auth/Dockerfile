# Fetching the minified node image on apline linux
FROM node:slim

# Setting up the work directory
WORKDIR /app


# COPY package.json
COPY package.json /app

# Installing dependencies
RUN yarn install

# Copying all the files in our project
COPY . /app


# Exposing server port
EXPOSE 8080

# Starting our application
CMD [ "npm", "run", "dev" ]