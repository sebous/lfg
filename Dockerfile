FROM node:13-alpine
WORKDIR /server
COPY ./server/package*.json ./
ENV NODE_ENV=production
RUN npm install
COPY ./server/dist ./dist
COPY ./server/ormconfig.json .
EXPOSE 4000
CMD ["npm", "run", "start:prod"]
