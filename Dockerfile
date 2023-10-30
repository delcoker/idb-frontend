FROM node:18.18.0-alpine as build

COPY . /app

WORKDIR /app

RUN npm install
RUN npm run build

FROM nginx:1.19.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



#FROM node:12.16.0-alpine as final
#
#RUN apk update && apk add bash
#
#RUN mkdir -p /app
#
#COPY .env /app
#COPY ./package.json /app
#
#COPY ./prod_server /be_fe/prod_server
#WORKDIR /be_fe
#RUN npm i
#RUN npm i -g serve
#COPY wait-for-it.sh ./
#CMD ["npm", "run", "serve"]


#FROM node:18.18.0
#
#WORKDIR /app
#
#COPY package*.json ./
#
#RUN npm install
#
#COPY . .
#
#RUN chgrp -R 0 /app && \
#    chmod -R g+rwX /app
#
#RUN mkdir /.npm && chown -R 1000960000:0 /.npm
#
#
#EXPOSE 3000
#
#CMD ["npm", "start"]
