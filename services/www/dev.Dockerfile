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

ENV CMS_URL=http://cms:1337/
ENV CMS_API_TOKEN=""

CMD ["npm", "run", "dev"]
