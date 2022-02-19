# Step 1
FROM mhart/alpine-node:14 as react-build
RUN mkdir /app/
WORKDIR /app/
COPY package*.json /app/
RUN npm ci
COPY . /app/
RUN npm run build

# Stage 2
FROM nginx:1.21.1-alpine
COPY --from=react-build /app/build /usr/share/nginx/html
COPY ./nginx/conf.d/*.conf /etc/nginx/conf.d/
COPY ./nginx/*.conf /etc/nginx/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]