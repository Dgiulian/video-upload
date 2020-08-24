FROM node:14.8.0-stretch-slim as base

RUN apt-get update && apt-get install -y ffmpeg

ENV NODE_ENV=production

###
###  PRODUCTION BUILD
###

FROM base as prod

WORKDIR /usr/app

COPY package.json package-lock*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["node", "./bin/www"]


###
## Development Build with nodemon
###
FROM prod as dev

ENV NODE_ENV=development

RUN npm install --only=development

WORKDIR /usr/app

CMD ["nodemon", "./bin/www", "--inspect=0.0.0.0:9229"]
