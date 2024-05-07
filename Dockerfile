# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR / 

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application runs on
EXPOSE 3000

# Start your application
CMD ["node", "app.js"]