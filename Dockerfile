# FROM node:13.10.1-alpine3.11



# WORKDIR /usr/src/app

# LABEL key="khattak.ahmed@yahoo.com"

# COPY package.json .

# # https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#node-gyp-alpine
# # https://github.com/nodejs/docker-node/issues/282
# # --no-cache: download package index on-the-fly, no need to cleanup afterwards
# # --virtual: bundle packages, remove whole bundle at once, when done
# RUN apk --no-cache --virtual build-dependencies add \
#     python \
#     make \
#     g++ \
#     && npm install \
#     && apk del build-dependencies

# COPY . .

# CMD [ "npm" ,"start" ]

FROM ubuntu

ENTRYPOINT [ "sleep" ] 

CMD [ "5" ]