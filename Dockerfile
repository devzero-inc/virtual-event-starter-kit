FROM docker:20-dind

RUN apk add --no-cache nodejs npm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["sh", "-c", "dockerd-entrypoint.sh &>/dev/null & /app/entrypoint.sh"]