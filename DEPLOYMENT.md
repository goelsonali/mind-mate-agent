# Mind Mate Deployment Guide

This guide outlines the steps to deploy the Mind Mate application to Google Cloud Platform (GCP) using Cloud Run for both frontend and backend services.

#### Prerequisites
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed
- GCP project created with billing enabled
- Docker installed locally (for local testing)
- [gcloud CLI](https://cloud.google.com/sdk/gcloud) configured with your GCP account

#### Local Development Setup

1. **Create a dedicated configuration for Mind Mate**

   If you work with multiple GCP projects, it's recommended to create a dedicated configuration:

   ```bash
   # Create a new configuration named 'mindmate'
   gcloud config configurations create mindmate
   
   # Activate the configuration
   gcloud config configurations activate mindmate
   ```

2. **Authenticate with Google Cloud**

   ```bash
   # Login with your Google account
   gcloud auth login
   
   # For service account authentication (alternative)
   gcloud auth activate-service-account --key-file=path/to/service-account-key.json
   ```

3. **Configure your project settings**

   ```bash
   # Set your project ID
   gcloud config set project static-concept-459810-q7
   
   # Set default region to London
   gcloud config set compute/region europe-west2
   
   # Verify your configuration
   gcloud config list
   ```

#### Deployment Steps

1. **Set up your GCP project**

   ```bash
   # Set your project ID
   export PROJECT_ID=your-project-id
   gcloud config set project $PROJECT_ID
   ```

2. **Enable required APIs**

   ```bash
   gcloud services enable cloudbuild.googleapis.com run.googleapis.com containerregistry.googleapis.com
   ```

3. **Set up required IAM permissions**

   Cloud Build requires specific permissions to deploy to Cloud Run and write logs. Set these up with:

   ```bash
   # Replace PROJECT_ID with your actual project ID
   # Add Logs Writer role to the compute service account
   gcloud projects add-iam-policy-binding PROJECT_ID --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com --role=roles/logging.logWriter

   # Add Logs Writer role to the Cloud Build service account
   gcloud projects add-iam-policy-binding PROJECT_ID --member=serviceAccount:PROJECT_NUMBER@cloudbuild.gserviceaccount.com --role=roles/logging.logWriter

   # Add Storage Admin role to the compute service account
   gcloud projects add-iam-policy-binding PROJECT_ID --member=serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com --role=roles/storage.admin

   # Add Cloud Run Admin role for deployment
   gcloud projects add-iam-policy-binding PROJECT_ID --member=serviceAccount:PROJECT_NUMBER@cloudbuild.gserviceaccount.com --role=roles/run.admin

   # Add Service Account User role
   gcloud projects add-iam-policy-binding PROJECT_ID --member=serviceAccount:PROJECT_NUMBER@cloudbuild.gserviceaccount.com --role=roles/iam.serviceAccountUser
   ```

   > **Note**: Replace PROJECT_ID with your GCP project ID and PROJECT_NUMBER with your numeric project number. You can find your project number by running `gcloud projects describe PROJECT_ID --format="value(projectNumber)"`

4. **Build and deploy using Cloud Build**

   ```bash
   # From the project root directory
   gcloud builds submit --config=cloudbuild.yaml
   ```

   This will:
   - Build your Docker container for the frontend
   - Push it to Container Registry
   - Deploy it to Cloud Run

5. **Manual deployment (alternative)**

   ```bash
   # Build the container locally from the project root
   docker build -t gcr.io/$PROJECT_ID/mindmate-frontend -f ./app/frontend/Dockerfile ./app/frontend
   
   # Push to Container Registry
   docker push gcr.io/$PROJECT_ID/mindmate-frontend
   
   # Deploy to Cloud Run
   gcloud run deploy mindmate-frontend \
     --image gcr.io/$PROJECT_ID/mindmate-frontend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

6. **Get the deployed URL**

   ```bash
   gcloud run services describe mindmate-frontend --platform managed --region us-central1 --format 'value(status.url)'
   ```



## Backend Deployment (FastAPI)

### Deploy to Cloud Run

1. **Create a Dockerfile for the backend**

   ```bash
   # From the project root, create a Dockerfile in the app/backend directory
   cat > app/backend/Dockerfile << 'EOF'
   FROM python:3.11-slim

   WORKDIR /app

   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt

   COPY . .

   CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
   EOF
   ```

2. **Create a Cloud Build configuration for the backend**

   ```bash
   # Create a backend-specific cloudbuild.yaml
   cat > backend-cloudbuild.yaml << 'EOF'
   steps:
     # Build the container image
     - name: 'gcr.io/cloud-builders/docker'
       args: ['build', '-t', 'gcr.io/$PROJECT_ID/mindmate-backend:$COMMIT_SHA', '-f', './app/backend/Dockerfile', './app/backend']
     
     # Push the container image to Container Registry
     - name: 'gcr.io/cloud-builders/docker'
       args: ['push', 'gcr.io/$PROJECT_ID/mindmate-backend:$COMMIT_SHA']
     
     # Deploy container image to Cloud Run
     - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
       entrypoint: gcloud
       args:
         - 'run'
         - 'deploy'
         - 'mindmate-backend'
         - '--image'
         - 'gcr.io/$PROJECT_ID/mindmate-backend:$COMMIT_SHA'
         - '--region'
         - 'us-central1'
         - '--platform'
         - 'managed'
         - '--allow-unauthenticated'

   images:
     - 'gcr.io/$PROJECT_ID/mindmate-backend:$COMMIT_SHA'
   EOF
   ```

3. **Deploy the backend**

   ```bash
   gcloud builds submit --config=backend-cloudbuild.yaml
   ```

## Setting Up Custom Domain (Optional)

```bash
gcloud beta run domain-mappings create --service mindmate-frontend --domain your-frontend-domain.com --region us-central1
gcloud beta run domain-mappings create --service mindmate-backend --domain your-api-domain.com --region us-central1
```

## Configuring Environment Variables

### For Cloud Run:

Add environment variables in the Cloud Run console or via gcloud:

```bash
gcloud run services update mindmate-frontend \
  --set-env-vars "API_URL=https://your-backend-url.com" \
  --region us-central1
```

## Firebase Credentials with Secret Manager

The Mind Mate application uses Google Cloud Secret Manager to securely store and access Firebase credentials. This approach avoids JSON parsing issues and improves security by not embedding credentials in environment variables or container images.

### Setting up Secret Manager for Firebase Credentials

1. **Create the secrets in Secret Manager**

   ```bash
   # Create a secret for Firebase credentials
   gcloud secrets create firebase-credentials --replication-policy="automatic"
   
   # Create a secret for Google application credentials
   gcloud secrets create google-application-credentials --replication-policy="automatic"
   ```

2. **Add your Firebase credentials JSON to the secrets**

   ```bash
   # Add Firebase credentials from a JSON file
   gcloud secrets versions add firebase-credentials --data-file="path/to/firebase-credentials.json"
   
   # Add Google application credentials from a JSON file
   gcloud secrets versions add google-application-credentials --data-file="path/to/google-application-credentials.json"
   ```

3. **Grant access to Cloud Run service account**

   ```bash
   # Get your Cloud Run service account
   SERVICE_ACCOUNT="$(gcloud projects describe static-concept-459810-q7 --format='value(projectNumber)')-compute@developer.gserviceaccount.com"
   
   # Grant Secret Manager Secret Accessor role for firebase-credentials
   gcloud secrets add-iam-policy-binding firebase-credentials \
     --member="serviceAccount:${SERVICE_ACCOUNT}" \
     --role="roles/secretmanager.secretAccessor"
   
   # Grant Secret Manager Secret Accessor role for google-application-credentials
   gcloud secrets add-iam-policy-binding google-application-credentials \
     --member="serviceAccount:${SERVICE_ACCOUNT}" \
     --role="roles/secretmanager.secretAccessor"
   ```

4. **Deploy with Secret Manager integration**

   When deploying to Cloud Run, use the `--update-secrets` flag to mount the secrets as environment variables:

   ```bash
   gcloud run deploy mindmate-backend \
     --image ${BACKEND_IMAGE} \
     --platform managed \
     --region ${REGION} \
     --env-vars-file ${ENV_FILE} \
     --update-secrets=FIREBASE_CREDENTIALS_JSON=firebase-credentials:latest,GOOGLE_APPLICATION_CREDENTIALS_JSON=google-application-credentials:latest \
     --allow-unauthenticated
   ```

   This approach ensures that the Firebase credentials are securely stored and accessed by the application without exposing them in environment variables or embedding them in the container.

## Continuous Deployment

Set up a Cloud Build trigger to automatically deploy when you push to your repository:

1. Go to Cloud Build > Triggers
2. Create a new trigger
3. Connect to your repository
4. Specify the build configuration file (cloudbuild.yaml)
5. Set the trigger event (e.g., push to main branch)

