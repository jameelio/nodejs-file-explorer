FROM node:lts-alpine

RUN mkdir -p /src
WORKDIR /src

COPY package*.json /src/

RUN npm install

RUN rm -f .npmrc

COPY . /src

EXPOSE 8080
EXPOSE 9229

CMD "npm" "start"
