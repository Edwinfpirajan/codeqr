FROM node:18.12-alpine3.15
RUN mkdir /app
ADD . /app
WORKDIR /app
ARG EnvironmentVariable
RUN npm install
RUN npm run build
EXPOSE $PORT
CMD ["npm","run","dev"]