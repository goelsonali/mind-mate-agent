# Use Node.js 20 which matches your local development environment
FROM node:20 as build

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies with optimizations
RUN npm config set registry https://registry.npmjs.org/ && \
    npm ci --prefer-offline --no-audit --progress=false

# Copy public assets and configuration files first
COPY public/ ./public/
COPY vite.config.js tsconfig*.json ./

# Add a build argument for cache busting
ARG CACHE_BUST=unknown

# Copy source code (most likely to change)
COPY src/ ./src/

# Set environment variables
# API Configuration
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=${VITE_GEMINI_API_KEY:-""}
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL:-"https://mindmate-backend-6xntrakg7q-nw.a.run.app"}

# Environment
ARG VITE_APP_ENV
ENV VITE_APP_ENV=${VITE_APP_ENV:-"production"}

# Feature Flags
ARG VITE_ENABLE_ANALYTICS
ENV VITE_ENABLE_ANALYTICS=${VITE_ENABLE_ANALYTICS:-"true"}

# Build the application
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
