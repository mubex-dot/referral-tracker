# ---------- Build Stage ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

# Copy source and build
COPY . .
RUN npx prisma generate
RUN npm run build

# ---------- Production Stage ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Only copy what is absolutely necessary for production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Use a non-root user for better security
USER node

EXPOSE 3000

# Use a script-style CMD to ensure environment variables are evaluated
CMD npx prisma migrate deploy && node dist/app.js
