# Use Node.js base image
FROM node:19

# Set working directory
WORKDIR /root/service_product

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm set network-timeout 3000000

# Install dependencies
RUN npm install

# Install Prisma CLI globally for managing migrations and schema
RUN npm install -g prisma

# Copy application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

# Expose application port
EXPOSE 3000

# Start application
CMD ["npm", "run", "start:prod"]
