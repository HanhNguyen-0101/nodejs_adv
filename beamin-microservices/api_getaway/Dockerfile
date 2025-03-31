# Use Node.js base image
FROM node:14

# Set working directory
WORKDIR /root/api_getaway

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm set network-timeout 3000000

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "run", "start:prod"]
