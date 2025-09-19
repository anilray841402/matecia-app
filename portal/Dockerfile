FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

EXPOSE 3000

# Start in development mode
#CMD ["npm", "start"]
CMD ["npm", "start", "--", "--watch-options-poll=1000", "--watch-options-stdin", "--legacy-watch"]
