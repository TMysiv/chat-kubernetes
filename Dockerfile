FROM node:18-alpine

WORKDIR /app
COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 5200

CMD [ "npm", "run", "start" ]
