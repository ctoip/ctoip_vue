FROM --platform=$BUILDPLATFORM node:16-bullseye AS builder

WORKDIR /workspace
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /workspace/dist /usr/share/nginx/html/dist

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
