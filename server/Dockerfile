FROM senecio/node-ffprobe:8.1.4

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install --silent

COPY . .

EXPOSE 3001
