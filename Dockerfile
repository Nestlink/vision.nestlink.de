FROM node:18

WORKDIR /app

COPY /.npmrc /app/
COPY /package*.json /app/
RUN npm ci

COPY .env /app/

COPY /prisma/ /app/prisma/
RUN npx prisma generate
RUN npx prisma migrate deploy

COPY /src /app/src
COPY /static /app/static
COPY postcss.config.cjs /app/
COPY svelte.config.js /app/
COPY vite.config.js /app/

RUN npm run build

CMD [ "node", "/app/build/index.js" ]