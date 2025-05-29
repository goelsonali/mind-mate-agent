#!/bin/bash
# Mind Mate Deployment Script for Google Cloud Platform

# Set variables
PROJECT_ID="static-concept-459810-q7"
REGION="europe-west2"  # London region for lower latency in the UK
REGISTRY="europe-west2-docker.pkg.dev/${PROJECT_ID}/mindmate"
FRONTEND_IMAGE="${REGISTRY}/frontend:latest"
BACKEND_IMAGE="${REGISTRY}/backend:latest"

echo "Starting Mind Mate deployment to Google Cloud Platform..."
echo "Project ID: ${PROJECT_ID}"
gcloud config set project ${PROJECT_ID}

# Enable required APIs
echo "Enabling required GCP APIs..."
gcloud services enable containerregistry.googleapis.com run.googleapis.com cloudbuild.googleapis.com

# Build and deploy frontend
echo "Building and deploying frontend..."
echo "Building frontend Docker image..."
docker build -t ${FRONTEND_IMAGE} -f ./app/frontend/Dockerfile ./app/frontend

echo "Pushing frontend image to Container Registry..."
docker push ${FRONTEND_IMAGE}

echo "Deploying frontend to Cloud Run..."
gcloud run deploy mindmate-frontend \
  --image ${FRONTEND_IMAGE} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated

# Build and deploy backend
echo "Building and deploying backend..."
echo "Building backend Docker image..."
docker build -t ${BACKEND_IMAGE} -f ./app/backend/Dockerfile ./app/backend

echo "Pushing backend image to Container Registry..."
docker push ${BACKEND_IMAGE}

echo "Deploying backend to Cloud Run..."

# Load environment variables from .env file for local values
if [ -f "./app/backend/.env" ]; then
  echo "Loading environment variables from .env file..."
  source ./app/backend/.env
else
  echo "Warning: .env file not found. Using default values."
  # Set default values if .env doesn't exist
  GOOGLE_CLIENT_ID="default-client-id"
  GOOGLE_CLIENT_SECRET="default-client-secret"
  JWT_SECRET="default-jwt-secret"
  GEMINI_API_KEY="default-gemini-key"
fi

# Create a temporary env file for the backend
echo "Creating environment variables file..."
ENV_FILE="./backend-env.yaml"

cat > ${ENV_FILE} << EOL
GOOGLE_CLIENT_ID: "${GOOGLE_CLIENT_ID}"
GOOGLE_CLIENT_SECRET: "${GOOGLE_CLIENT_SECRET}"
JWT_SECRET: "${JWT_SECRET}"
GEMINI_API_KEY: "${GEMINI_API_KEY}"
ENVIRONMENT: "production"
HOST: "0.0.0.0"
FRONTEND_URL: "https://mindmate-frontend-6xntrakg7q-nw.a.run.app"
REDIRECT_URI: "https://mindmate-backend-6xntrakg7q-nw.a.run.app/auth/google/callback"
EOL

# Verify Secret Manager secrets exist
echo "Verifying Secret Manager secrets..."
FIREBASE_SECRET_EXISTS=$(gcloud secrets describe firebase-credentials --project=${PROJECT_ID} 2>/dev/null && echo "true" || echo "false")
GOOGLE_CREDS_SECRET_EXISTS=$(gcloud secrets describe google-application-credentials --project=${PROJECT_ID} 2>/dev/null && echo "true" || echo "false")

echo "Deploying backend with Secret Manager integration..."

# Deploy with Secret Manager secrets
gcloud run deploy mindmate-backend \
  --image ${BACKEND_IMAGE} \
  --platform managed \
  --region ${REGION} \
  --env-vars-file ${ENV_FILE} \
  --update-secrets=FIREBASE_CREDENTIALS_JSON=firebase-credentials:latest,GOOGLE_APPLICATION_CREDENTIALS_JSON=google-application-credentials:latest \
  --allow-unauthenticated

# Clean up the temporary env file
rm ${ENV_FILE}

# Get service URLs
echo "Deployment complete! Service URLs:"
echo "Frontend: $(gcloud run services describe mindmate-frontend --platform managed --region ${REGION} --format 'value(status.url)')"
echo "Backend: $(gcloud run services describe mindmate-backend --platform managed --region ${REGION} --format 'value(status.url)')"

echo "Setting up environment variables for frontend to communicate with backend..."
BACKEND_URL=$(gcloud run services describe mindmate-backend --platform managed --region ${REGION} --format 'value(status.url)')
gcloud run services update mindmate-frontend \
  --platform managed \
  --region ${REGION} \
  --set-env-vars "VITE_API_URL=${BACKEND_URL}"

echo "Mind Mate deployment completed successfully!"
