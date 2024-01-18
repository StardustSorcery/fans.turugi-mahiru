######## BASE ########
FROM node:18-alpine AS base
ENV NPM_CONFIG_UPDATE_NOTIFIER false

######## DEV DEPS ########
# Install dependencies only when needed
FROM base AS dev-deps
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

######## PROD DEPS ########
# Install dependencies only when needed
FROM base AS prod-deps
ENV NODE_ENV production
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

######## BUILDER ########
# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

######## RUNNER ########
# Production image, copy all the files and run next
FROM base AS runner
ENV NODE_ENV production
RUN apk add tini tzdata
ENTRYPOINT ["/sbin/tini", "--"]
WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist

USER node

ENV TZ=Asia/Tokyo

ENV YT_CHANNEL_ID "UCSzT-rU62SSiham-g1Dj9yw"
ENV CRON_RULE "*/30 * * * * *"
ENV REDIS_URI redis://redis/1
ENV REDIS_VIDEO_ETAG_HASH_KEY ytlive-sync:video-etag-hash
ENV CMS_URL http://cms:1337/
ENV CMS_API_TOKEN ""
ENV GOOGLE_API_KEY ""

CMD ["node", "./dist/index.js"]
