# Quick and dirty
FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json and the app files to the working directory
COPY public/ /app/public
COPY src/ /app/src
COPY package*.json /app/

COPY .env /app/

RUN npm install

CMD ["npm", "start"]