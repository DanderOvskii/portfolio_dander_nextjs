# syntax=docker.io/docker/dockerfile:1

# Base image
FROM node:18-alpine AS base
WORKDIR /app

# Install basic dependencies required by Prisma and git
RUN apk add --no-cache libc6-compat bash openssl postgresql-client git

# Install dependencies only when needed
FROM base AS deps

# Clone the repository
ARG REPO_URL = https://github.com/DanderOvskii/portfolio_dander_nextjs.git
ARG REPO_BRANCH=main
RUN git clone --depth 1 --branch $REPO_BRANCH $REPO_URL . || (echo "Git clone failed" && exit 1)

# Install dependencies based on lockfile
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Build the source code
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app .  
# Generate Prisma client
RUN npx prisma generate

# Build Next.js
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN apk add --no-cache libc6-compat bash openssl postgresql-client

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built app and Prisma client
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./ 
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs
EXPOSE 3000

CMD ["sh", "-c", "until pg_isready -h db -p 5432; do echo 'Waiting for DB...'; sleep 1; done; npx prisma migrate deploy && node server.js"]
