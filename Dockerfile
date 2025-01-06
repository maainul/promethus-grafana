# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application files to the working directory
COPY . .

# Expose the application's port
EXPOSE 8000

# Start the application
CMD ["node", "index.js"]
