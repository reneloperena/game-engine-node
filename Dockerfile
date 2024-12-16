# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json yarn.lock ./

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc yarn install --frozen-lockfile

COPY . .

# Build the application
RUN yarn build

# Prune development dependencies
RUN yarn install --production --frozen-lockfile

# Production stage
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER node

CMD ["npm", "run", "start"]