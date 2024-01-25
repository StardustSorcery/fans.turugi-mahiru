######## BASE ########
FROM node:18-alpine AS base
ENV NPM_CONFIG_UPDATE_NOTIFIER false

ARG CMS_PUBLIC_URL=http://cms.turugi-mahiru.fans.127.0.0.1.nip.io:8080/
ENV CMS_PUBLIC_URL=${CMS_PUBLIC_URL}
ENV NEXT_PUBLIC_CMS_PUBLIC_URL=${CMS_PUBLIC_URL}

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

ENV GOOGLE_APPLICATION_CREDENTIALS=/secrets/firebase-admin.json
ENV CMS_URL=http://cms:1337/
ENV CMS_API_TOKEN=""

CMD ["npm", "run", "dev"]
