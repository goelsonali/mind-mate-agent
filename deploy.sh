#!/bin/bash
# Mind Mate Deployment Script for Google Cloud Platform

# Set variables
PROJECT_ID="static-concept-459810-q7"
FRONTEND_IMAGE="gcr.io/${PROJECT_ID}/mindmate-frontend:latest"
BACKEND_IMAGE="gcr.io/${PROJECT_ID}/mindmate-backend:latest"
REGION="europe-west2"  # London region for lower latency in the UK

echo "Starting Mind Mate deployment to Google Cloud Platform..."
echo "Project ID: ${PROJECT_ID}"

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
gcloud run deploy mindmate-backend \
  --image ${BACKEND_IMAGE} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated

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
