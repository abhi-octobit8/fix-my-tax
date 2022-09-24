FROM node:16 as build
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn build
RUN ls -lart /app && ls -la /app/build

FROM nginx:stable-alpine
WORKDIR /build
RUN apk add --no-cache ca-certificates bash
COPY --from=build /app/build /build
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
COPY privkey.pem /etc/nginx/postaltracking.key
COPY fullchain.pem /etc/nginx/postaltracking.chained.crt
CMD ["nginx", "-g", "daemon off;"]
