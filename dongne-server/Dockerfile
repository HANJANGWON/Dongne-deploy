FROM node:16.16.0

ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \  
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
    
WORKDIR /app/server

COPY package*.json .
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./

COPY . .

RUN npm install

RUN npm run prisma:generate

RUN npm run build

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["sh","/app/server/docker-entrypoint.sh"]

EXPOSE 4000




