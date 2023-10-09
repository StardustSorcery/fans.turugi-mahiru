FROM node:14.21.1-alpine3.16 as builder
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PUBLIC_URL="https://cms.ha-rehare.fans/"
ENV PUBLIC_URL=${PUBLIC_URL}

RUN apk update &&\
    apk add build-base gcc autoconf automake zlib-dev libpng-dev vips-dev &&\
    rm -rf /var/cache/apk/* > /dev/null 2>&1

WORKDIR /opt/app
COPY ./package*.json ./
RUN npm ci
COPY ./ .
RUN npm run build


FROM node:14.21.1-alpine3.16
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
VOLUME /opt/app/public/uploads
EXPOSE 1337

RUN apk add --no-cache tini
ENTRYPOINT [ "/sbin/tini", "--" ]

RUN apk add tzdata vips-dev
RUN rm -rf /var/cache/apk/*

WORKDIR /opt/app
COPY --from=builder /opt/app ./
CMD [ "npm", "start" ]

HEALTHCHECK --interval=30s --timeout=60s --start-period=15s --retries=4 \
  CMD wget -q -O - http://127.0.0.1:1337/_health || exit 1

ARG PUBLIC_URL="https://cms.ha-rehare.fans/"
ENV PUBLIC_URL=${PUBLIC_URL}

ENV DATABASE_CLIENT="mysql"
ENV DATABASE_HOST="mysql"
ENV DATABASE_PORT="3306"
ENV DATABASE_NAME="strapi"
ENV DATABASE_USERNAME="strapi"
ENV DATABASE_PASSWORD=""
ENV DATABASE_CHARSET="utf8mb4"
ENV DATABASE_SSL="false"
ENV JWT_SECRET=""
ENV ADMIN_JWT_SECRET=""
ENV API_TOKEN_SALT=""
ENV APP_KEYS=""

