FROM node:14-alpine
WORKDIR /server
COPY ./server/package.json ./server/yarn.lock ./
RUN yarn install
COPY ./server/src ./src
COPY ./server/ormconfig.json .
COPY ./server/tsconfig.json .
ENV NODE_ENV=production
EXPOSE 4000
CMD ["npm", "run", "start:prod"]
