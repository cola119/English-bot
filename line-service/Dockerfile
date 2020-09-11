FROM node:14.8

# Fix certification error
RUN npm config set strict-ssl false

RUN npm i -g @nestjs/cli

WORKDIR /line-service
COPY package*.json /line-service/

RUN npm ci

CMD ["npm", "run", "start:dev"]