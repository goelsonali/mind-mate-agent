FROM node:20 as build

WORKDIR /app

# Copy package files and install dependencies
COPY package.docker.json ./package.json

# Install dependencies with improved compatibility
RUN npm install

# Copy source code
COPY . .

# Fix permissions for all executables in node_modules
RUN find /app/node_modules -type f -name "*" -exec chmod +x {} \;
RUN find /app/node_modules -type d -exec chmod 755 {} \;
RUN chmod -R 755 /app/node_modules/.bin
RUN chmod -R 755 /app/node_modules/@esbuild

# Build the app
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
