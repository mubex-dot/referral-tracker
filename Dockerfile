# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

RUN npx prisma generate
RUN npm run build


# ---------- Production Stage ----------
FROM node:20-alpine AS production

WORKDIR /app

# 🔥 Accept build args from CapRover
ARG DATABASE_URL
ARG APP_URL
ARG SENDGRID_API_KEY
ARG SENDGRID_FROM_EMAIL
ARG NODE_ENV
ARG PORT

# 🔥 Inject into container ENV
ENV DATABASE_URL=${DATABASE_URL}
ENV APP_URL=${APP_URL}
ENV SENDGRID_API_KEY=${SENDGRID_API_KEY}
ENV SENDGRID_FROM_EMAIL=${SENDGRID_FROM_EMAIL}
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY --from=builder /app/dist ./dist

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3000

# 🔥 Run migrations + start app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/app.js"]