# Build stage
FROM node:21-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci

# Remove .npmrc so it doesn't get copied with COPY .
RUN rm -f .npmrc

COPY . .

RUN npx prisma generate
RUN npm run build
RUN npm prune --production

# Production stage
FROM node:21-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/schema.graphql ./schema.graphql

USER node

CMD ["npm", "run", "start"]