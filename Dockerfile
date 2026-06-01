# Build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage — pin to mainline alpine and force package upgrades for CVE fixes
FROM nginx:alpine as production-stage
RUN apk upgrade --no-cache
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Copy custom nginx config to handle SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
