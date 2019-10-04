FROM node:12-alpine

ENV EXPOSE_PORT 3000
ENV TZ=Asia/Shanghai

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
COPY startup.sh ./

RUN npm i

COPY . .

RUN npm run build

#RUN cp ./dist/config.json.template ./config/config.json

EXPOSE ${EXPOSE_PORT}

# CMD [ "node", "/app/dist/index.js" ]
CMD ["./startup.sh"]

USER node