# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Add build argument for Firebase API key
ARG VITE_FIREBASE_API_KEY

# Set it as an environment variable during build
ENV VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build the project
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy the built files from the build stage to NGINX public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom nginx config for the client
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
