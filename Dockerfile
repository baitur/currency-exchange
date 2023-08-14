FROM node:16-alpine as base
# Alpine images missing dependencies
RUN apk add --no-cache git
WORKDIR /usr/app
# Default environment (build + run time)
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
# App and dev dependencies
COPY ["package.json", "./"]
RUN npm install
# App source
COPY . .
COPY .env.template .env
FROM base
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
