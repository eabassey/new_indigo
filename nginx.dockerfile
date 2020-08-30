FROM nginx:alpine
LABEL author="Enoch Abassey"
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
