# Use Node.js LTS version for better stability
FROM node:18-alpine as build

WORKDIR /app

# Install dependencies for node-gyp (if needed)
RUN apk add --no-cache python3 make g++

# First copy only package files to leverage Docker cache
COPY package.json package-lock.json ./

# Clean install dependencies with legacy peer deps flag to avoid compatibility issues
RUN npm ci --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Set environment variables
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=${VITE_GEMINI_API_KEY:-""}
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL:-"https://mindmate-backend-6xntrakg7q-nw.a.run.app"}

# Explicitly install react-router-dom to ensure it's available
RUN npm install react-router-dom@6.30.1 @react-oauth/google@0.12.1 --save

# Build the application with production mode
ENV NODE_ENV=production
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy built files from build stage to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config for Cloud Run
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Set environment variable for Nginx template processing
ENV PORT=8080

# Create entrypoint script to handle dynamic port
RUN printf '#!/bin/sh\n\nenvsubst "\$PORT" < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf\nnginx -g "daemon off;"\n' > /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

# Start Nginx with dynamic port configuration
CMD ["/docker-entrypoint.sh"]
