######## BASE ########
FROM node:18-alpine AS base
ENV NPM_CONFIG_UPDATE_NOTIFIER false

######## DEV DEPS ########
# Install dependencies only when needed
FROM base AS dev-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

######## BUILDER ########
# Rebuild the source code only when needed
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED 1
WORKDIR /app

COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

######## RUNNER ########
# Production image, copy all the files and run next
FROM base AS runner
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN apk add tini tzdata
ENTRYPOINT ["/sbin/tini", "--"]
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 80
ENV PORT 80
ENV HOSTNAME "0.0.0.0"
ENV TZ=Asia/Tokyo

ENV CMS_URL=http://cms:1337/
ENV CMS_API_TOKEN=""

CMD ["node", "server.js"]
