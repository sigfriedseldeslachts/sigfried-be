FROM node:16-alpine AS build

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

COPY . /usr/src/nuxt-app/

RUN yarn && yarn generate

# Actual application
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/nuxt-app/dist /var/www/http

EXPOSE 80
