FROM node:carbon-alpine

ENV BUILD_PACKAGES="python make gcc g++ git libuv bash curl tar bzip2" \
    NODE_ENV=production \
    ROOT_URL=http://localhost:3000 \
    MONGO_URL=mongodb://172.17.0.2:27017 \
    PORT=3000

WORKDIR /root/app/bundle

RUN apk --update add ${BUILD_PACKAGES}
ADD jethro.tar.gz /root/app
RUN cd programs/server/ && npm install --unsafe-perm
RUN apk --update del ${BUILD_PACKAGES}

ENV MONGO_URL=mongodb://172.17.0.2:27017/jethro

EXPOSE 3000
CMD node main.js