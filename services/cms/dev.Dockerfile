FROM node:14.21.1-alpine3.16
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
VOLUME /app
EXPOSE 1337

RUN apk add --no-cache tini
ENTRYPOINT [ "/sbin/tini", "--" ]

RUN apk update &&\
    apk add tzdata build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

WORKDIR /app
CMD [ "npm", "run", "develop" ]

HEALTHCHECK --interval=30s --timeout=60s --start-period=15s --retries=4 \
  CMD wget -q -O - http://127.0.0.1:1337/_health || exit 1

ARG PUBLIC_URL="https://cms.turugi-mahiru.fans.127.0.0.1.nip.io:8080/"
ENV PUBLIC_URL=${PUBLIC_URL}

ENV DATABASE_CLIENT="mysql"
ENV DATABASE_HOST="db"
ENV DATABASE_PORT="3306"
ENV DATABASE_NAME="dev"
ENV DATABASE_USERNAME="dev"
ENV DATABASE_PASSWORD="password"
ENV DATABASE_CHARSET="utf8mb4"
ENV DATABASE_SSL="false"
ENV JWT_SECRET=""
ENV ADMIN_JWT_SECRET=""
ENV API_TOKEN_SALT=""
ENV APP_KEYS=""
