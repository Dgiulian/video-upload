FROM node:14.8.0-stretch-slim as build-stage
WORKDIR /usr/app
COPY package*.json /usr/app/

RUN npm install

COPY ./ /usr/app/

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx

FROM nginx:1.15

COPY --from=build-stage /usr/app/build/ /usr/share/nginx/html

COPY --from=build-stage /usr/app/nginx.conf /etc/nginx/conf.d/default.conf