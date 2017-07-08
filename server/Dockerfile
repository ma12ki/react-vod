FROM node:8.1.2

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install --silent

COPY . .

EXPOSE 3001
