FROM node:14.21.1-alpine3.16
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
VOLUME /opt/app
EXPOSE 1337

RUN apk add --no-cache tini
ENTRYPOINT [ "/sbin/tini", "--" ]

RUN apk update &&\
    apk add tzdata build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

WORKDIR /opt/app
CMD [ "npm", "run", "develop" ]

HEALTHCHECK --interval=30s --timeout=60s --start-period=15s --retries=4 \
  CMD wget -q -O - http://127.0.0.1:1337/_health || exit 1

ARG PUBLIC_URL="http://localhost:1337/"
ENV PUBLIC_URL=${PUBLIC_URL}

ENV DATABASE_CLIENT="mysql"
ENV DATABASE_HOST="mysql"
ENV DATABASE_PORT="3306"
ENV DATABASE_NAME="strapi_dev"
ENV DATABASE_USERNAME="strapi_dev"
ENV DATABASE_PASSWORD=""
ENV DATABASE_SSL="false"
ENV JWT_SECRET=""
ENV ADMIN_JWT_SECRET=""
ENV API_TOKEN_SALT=""
ENV APP_KEYS=""

