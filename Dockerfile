# Tahap build: menggunakan Node.js untuk build app
FROM node:22-alpine AS build

# Update Alpine packages to patch vulnerabilities
RUN apk update && apk upgrade

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Tahap serve: menggunakan Nginx untuk serve hasil build
FROM nginx:stable-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
