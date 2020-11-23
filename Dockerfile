FROM node:13-alpine
WORKDIR /server
COPY ./server/package*.json ./
RUN npm install
COPY ./server/src ./src
COPY ./server/ormconfig.json .
COPY ./server/tsconfig.json .
RUN npm run build
ENV NODE_ENV=production
RUN rm  -rf ./src
EXPOSE 4000
CMD ["npm", "run", "start:prod"]
