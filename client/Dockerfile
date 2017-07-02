FROM node:8.1.2

WORKDIR /usr/client

COPY package.json yarn.lock ./
RUN yarn install --no-progress

COPY . .

EXPOSE 3000
