FROM node:16.16.0

WORKDIR /app/web

COPY package.json .
RUN npm install
COPY . .

ENTRYPOINT [ "npm", "start" ]
EXPOSE 3000


