# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and Prisma schema
COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build


# ---------- Production Stage ----------
FROM node:20-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci

# Copy Prisma schema and built files
COPY prisma ./prisma
COPY --from=builder /app/dist ./dist

# Generate Prisma client again for production
RUN npx prisma generate

# Expose app port
EXPOSE 3000

# Run migrations and start app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/app.js"]