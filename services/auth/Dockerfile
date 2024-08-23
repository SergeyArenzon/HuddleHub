# Fetching the minified node image on apline linux
FROM node

# Setting up the work directory
WORKDIR /app

# COPY package.json
COPY package*.json /app

# Installing dependencies
RUN npm install

COPY . .

# Exposing server port
EXPOSE 8081

# Starting our application
CMD [ "npm", "run", "dev" ]