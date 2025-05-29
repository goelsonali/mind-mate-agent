FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PORT=8080
ENV HOST=0.0.0.0
ENV ENVIRONMENT=production
ENV PYTHONUNBUFFERED=1

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .


# Expose the port the app runs on
EXPOSE ${PORT}

# Create a startup script
RUN echo '#!/bin/bash\n\
echo "Starting FastAPI application on port $PORT"\n\
uvicorn main:app --host 0.0.0.0 --port $PORT' > /app/start.sh \
    && chmod +x /app/start.sh

# Command to run the application
CMD ["/app/start.sh"]
