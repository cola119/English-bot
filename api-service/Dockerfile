FROM node:14.8

# Fix certification error
RUN npm config set strict-ssl false

RUN npm i -g @nestjs/cli

WORKDIR /api-service
COPY package*.json /api-service/

RUN npm ci

CMD ["npm", "run", "start:dev"]