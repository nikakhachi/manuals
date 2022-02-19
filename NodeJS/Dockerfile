FROM mhart/alpine-node:14
RUN mkdir /app
WORKDIR /app
COPY package*.json /app/
RUN npm ci
RUN npm install pm2 -g
COPY . /app/
EXPOSE 8080
CMD ["pm2-runtime", "server.js"]
