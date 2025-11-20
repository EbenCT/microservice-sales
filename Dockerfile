FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

FROM node:18-alpine AS runtime
RUN addgroup -g 1001 -S nodejs && adduser -S salesuser -u 1001
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --chown=salesuser:nodejs . .
USER salesuser
EXPOSE 3000
CMD ["node", "server.js"]
