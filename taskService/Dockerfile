# Use an official Node.js base image
FROM node:18.16.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker layer caching)
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the rest of the app's source code
COPY . .

# Expose the port your app runs on (optional for documentation)
# EXPOSE ${PORT}

# Default command to run your app
CMD ["node", "index.js"]
