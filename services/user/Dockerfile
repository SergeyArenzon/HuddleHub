FROM node:alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

COPY . .

# Build the application
RUN pnpm run build

# Use production mode by default
CMD [ "pnpm", "run", "start:dev" ]