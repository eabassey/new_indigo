FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./
COPY ./dist/apps/query-server/main.js ./

# RUN npm install
RUN npm i express body-parser node-fetch tslib helmet cors compression zipkin zipkin-instrumentation-express zipkin-transport-http http-tracer
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# COPY . .

EXPOSE 3000
CMD [ "node", "main.js" ]
