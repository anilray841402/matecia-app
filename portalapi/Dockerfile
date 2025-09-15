FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

# Use nodemon in dev (auto-reload on file changes)
CMD ["npx", "nodemon", "src/index.js"]
