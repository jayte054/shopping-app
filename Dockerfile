# Use the official Node.js 16 image as the base image
FROM node:16

# Install node-gyp globally (node-waf is deprecated, node-gyp is the current tool)
RUN yarn global add node-gyp

# Set the working directory inside the container
WORKDIR /jayte/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files to the container
COPY . .

# Build the NestJS application
RUN yarn build

# Expose the port your application is running on
EXPOSE 3000

# Command to start your application
CMD ["yarn", "start:prod"]
