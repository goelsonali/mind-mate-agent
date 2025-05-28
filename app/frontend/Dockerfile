# Use a specific Node.js version known to work with Vite
FROM node:16 as build

WORKDIR /app

# Copy only the package files first (for better caching)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy custom build script
COPY custom-build.js ./

# Copy the rest of the application code
COPY . .

# Set environment variables
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=${VITE_GEMINI_API_KEY:-""}
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL:-"https://mindmate-backend-6xntrakg7q-nw.a.run.app"}

# Build the application using custom build script
ENV NODE_ENV=production
RUN node custom-build.js

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
