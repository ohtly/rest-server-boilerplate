FROM node:12-alpine

ENV EXPOSE_PORT 3000
ENV TZ=Asia/Shanghai

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE ${EXPOSE_PORT}

CMD [ "node", "/app/dist/app.js" ]

USER node