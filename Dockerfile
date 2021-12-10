FROM mhart/alpine-node:latest
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
CMD ["node", "."]