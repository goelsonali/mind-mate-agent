FROM node:20-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package.docker.json ./package.json

# Install dependencies with specific platform to avoid OS-specific issues
RUN npm install --platform=linux --no-optional

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy built files from build stage to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
