dockerize -wait tcp://localhost:5432 -timeout 120s
npm run deploy
npm run start
