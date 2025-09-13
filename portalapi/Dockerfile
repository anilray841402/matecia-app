FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies including nodemon (for dev)
RUN npm install && npm install -g nodemon

COPY . .

EXPOSE 4000

# Use nodemon instead of node
CMD ["npm", "start"]
