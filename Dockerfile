FROM node:18.19

USER node:node

WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run build

CMD npm start