# Use the official Node.js image based on Alpine Linux as a base
# The 'node:21-alpine3.18' image is lightweight and includes Node.js version 21
FROM node:21-alpine3.18 AS build

# All subsequent commands will be run from this directory
WORKDIR /app

# This step is done before copying the rest of the files to leverage Docker's caching mechanism
COPY package.json package-lock.json ./

# Install dependencies including devDependencies for building the application
RUN npm install

# Copy TypeScript configuration and source files
COPY tsconfig.json ./
COPY src ./src

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:21-alpine3.18

WORKDIR /app

# Copy only the necessary files from the build stage
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist

# This is the port on which your application will run inside the container
EXPOSE 4001

# This will execute the script defined as 'start' in package.json
CMD ["npm", "run", "start:prod"]
