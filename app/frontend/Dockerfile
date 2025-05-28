# Use a specific Node.js version known to work with Vite
FROM node:18-buster as build

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy only the package files first (for better caching)
COPY package.json ./

# Install dependencies
RUN npm install --production=false --unsafe-perm

# Copy the rest of the application code
COPY . .

# Set environment variables
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=${VITE_GEMINI_API_KEY:-""}
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL:-"https://mindmate-backend-6xntrakg7q-nw.a.run.app"}

# Fix for crypto.getRandomValues issue
ENV NODE_OPTIONS=--openssl-legacy-provider

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
