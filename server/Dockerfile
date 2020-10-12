FROM node:13-alpine
WORKDIR /app
COPY ./package*.json ./
ENV NODE_ENV=production
RUN npm install
COPY ./dist .
COPY ./ormconfig.json .
EXPOSE 4000
CMD ["npm", "run", "start:prod"]
