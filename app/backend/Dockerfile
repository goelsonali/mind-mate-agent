FROM python:3.11-slim

WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Set environment variable for port (default to 8080 for Cloud Run)
ENV PORT=8080

# Expose the port the app runs on
EXPOSE ${PORT}

# Create entrypoint script to use PORT environment variable
RUN echo '#!/bin/bash\nuvicorn main:app --host 0.0.0.0 --port ${PORT}' > /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh

# Command to run the application
CMD ["/app/entrypoint.sh"]
