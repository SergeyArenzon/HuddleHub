# Stage 1: Build stage
FROM node:20-alpine AS builder
# Install pnpm
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile --prod=false

# Copy the source code
COPY src/ ./src/

# Build the application
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod


# Stage 2: Production stage
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Copy built files from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules/
COPY --from=builder /usr/src/app/dist ./dist/
COPY --from=builder /usr/src/app/package.json ./

# Set necessary environment variables
ENV NODE_ENV=production

EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"] 