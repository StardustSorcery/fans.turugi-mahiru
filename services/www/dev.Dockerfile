######## BASE ########
FROM node:18-alpine AS base
ENV NPM_CONFIG_UPDATE_NOTIFIER false

######## RUNNER ########
FROM base AS runner
RUN apk add tini tzdata
ENTRYPOINT ["/sbin/tini", "--"]
WORKDIR /app

VOLUME /app

EXPOSE 80
ENV PORT 80
ENV HOSTNAME "0.0.0.0"
ENV TZ=Asia/Tokyo

CMD ["npm", "run", "dev"]
