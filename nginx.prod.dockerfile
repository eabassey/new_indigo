## STAGE 1
FROM node:latest as node
LABEL author="Enoch"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm i -g @angular/cli@10.0.0
RUN ng build sil -c production


### STAGE 2
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
