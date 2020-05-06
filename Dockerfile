FROM node:10-alpine

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 9980
CMD ["npm", "start"]