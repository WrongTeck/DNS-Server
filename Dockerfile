FROM mhart/alpine-node:latest
WORKDIR /
COPY package.json ./
RUN npm i
RUN apk update && apk add mongodb redis
COPY . .
CMD ["node", "."]