FROM node:18-alpine AS build

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN npm install && npm run build

# Actual application
FROM busybox:stable

RUN adduser -D static
USER static
WORKDIR /home/static

COPY --from=build /usr/src/app/dist /home/static

EXPOSE 80
CMD ["busybox", "httpd", "-f", "-v", "-p", "80"]
