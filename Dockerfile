# Stage 1: Build Stage (Installs dependencies)
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

# Stage 2: Production/Final Image (Uses alpine for minimal attack surface)
FROM node:20-alpine3.18 
WORKDIR /app

# Copy installed dependencies from the build stage
COPY --from=build /app/node_modules ./node_modules

# Copy the application source code
COPY server.js .

EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]