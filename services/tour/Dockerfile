# Stage 1: Build stage
FROM node:20-alpine AS builder
# Install pnpm
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile --prod=false

# Copy the rest of the application source code
COPY . .

# Build the application
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod


# Stage 2: Production stage
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Copy necessary files from the builder stage
# Ensure destination directories end with a slash
COPY --from=builder /usr/src/app/node_modules ./node_modules/
COPY --from=builder /usr/src/app/dist ./dist/
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 4003

# Set NODE_ENV to production
ENV NODE_ENV production

# Start the application using the main file in dist
CMD [ "node", "dist/main.js" ] 