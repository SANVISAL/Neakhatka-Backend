FROM node:21-alpine3.18

WORKDIR /app

# Copy package.json, tsconfig.json, source code
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY private_key.pem ./
# Copy .env file from configs directory
COPY ./configs/.env ./.env
# Copy public_key.pem

# Install dependencies and nodemon
RUN npm install && npm install -g nodemon

EXPOSE 4001

CMD ["npm", "run", "start"]