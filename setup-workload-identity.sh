#!/bin/bash
# Setup Workload Identity Federation for GitHub Actions
# This script contains all the commands needed to set up Workload Identity Federation
# for authenticating GitHub Actions with Google Cloud Platform.
# Created: May 14, 2025

# Set your project variables
PROJECT_ID="static-concept-459810-q7"
PROJECT_NUMBER="431880575932"
REPO_NAME="goelsonali/mind-mate-agent"
POOL_NAME="github-pool"
PROVIDER_NAME="github-provider"
SERVICE_ACCOUNT_NAME="github-actions-mindmate"

echo "Setting up Workload Identity Federation for GitHub Actions..."
echo "Project ID: $PROJECT_ID"
echo "Repository: $REPO_NAME"

# Step 1: Create a Workload Identity Pool
echo "Step 1: Creating Workload Identity Pool..."
gcloud iam workload-identity-pools create $POOL_NAME \
  --project=$PROJECT_ID \
  --location=global \
  --display-name="GitHub Actions Pool"

# Step 2: Create a Workload Identity Provider
echo "Step 2: Creating Workload Identity Provider..."
gcloud iam workload-identity-pools providers create-oidc $PROVIDER_NAME \
  --project=$PROJECT_ID \
  --location=global \
  --workload-identity-pool=$POOL_NAME \
  --display-name="GitHub Actions Provider" \
  --attribute-mapping="google.subject=assertion.sub" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-condition="assertion.repository=='$REPO_NAME'"

# Step 3: Create a Service Account (if it doesn't exist)
echo "Step 3: Creating Service Account (if it doesn't exist)..."
gcloud iam service-accounts create $SERVICE_ACCOUNT_NAME \
  --project=$PROJECT_ID \
  --description="Service account for GitHub Actions CI/CD" \
  --display-name="GitHub Actions Mind Mate" || echo "Service account already exists, skipping creation."

# Step 4: Grant necessary permissions
echo "Step 4: Granting necessary permissions..."
# Cloud Build Editor
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/cloudbuild.builds.editor"

# Cloud Run Admin
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

# Storage Admin
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

# Logs Writer
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/logging.logWriter"

# Service Account User
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Step 5: Allow GitHub to impersonate the service account
echo "Step 5: Allowing GitHub Actions to impersonate the service account..."
gcloud iam service-accounts add-iam-policy-binding $SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com \
  --project=$PROJECT_ID \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$POOL_NAME/attribute.repository/$REPO_NAME"

#########################################################################
# ADDITIONAL MANUAL STEPS REQUIRED FOR MIND MATE DEPLOYMENT
#########################################################################

echo ""
echo "Additional Manual Steps Required for Mind Mate Deployment:"
echo "--------------------------------------------------------"

# Step 6: Grant Cloud Build service account permissions
echo "Step 6: Granting Cloud Build service account permissions..."
echo "Run these commands if you encounter permission issues with Cloud Build:"
echo ""
echo "# Add Logs Writer role to Cloud Build service account"
echo "gcloud projects add-iam-policy-binding $PROJECT_ID \\
  --member=\"serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com\" \\
  --role=\"roles/logging.logWriter\""
echo ""
echo "# Add Cloud Run Admin role to Cloud Build service account"
echo "gcloud projects add-iam-policy-binding $PROJECT_ID \\
  --member=\"serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com\" \\
  --role=\"roles/run.admin\""
echo ""
echo "# Add Service Account User role to Cloud Build service account"
echo "gcloud projects add-iam-policy-binding $PROJECT_ID \\
  --member=\"serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com\" \\
  --role=\"roles/iam.serviceAccountUser\""
echo ""
echo "# Add Storage Admin role to Cloud Build service account"
echo "gcloud projects add-iam-policy-binding $PROJECT_ID \\
  --member=\"serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com\" \\
  --role=\"roles/storage.admin\""

# Step 7: Allow public access to Cloud Run services
echo ""
echo "Step 7: Allowing public access to Cloud Run services..."
echo "After deploying your services, run these commands to make them publicly accessible:"
echo ""
echo "# Make frontend publicly accessible"
echo "gcloud run services add-iam-policy-binding --region=europe-west2 \\
  --member=allUsers \\
  --role=roles/run.invoker \\
  mindmate-frontend"
echo ""
echo "# Make backend publicly accessible"
echo "gcloud run services add-iam-policy-binding --region=europe-west2 \\
  --member=allUsers \\
  --role=roles/run.invoker \\
  mindmate-backend"

# Step 8: Selective deployment with substitution variables
echo ""
echo "Step 8: Selective deployment with substitution variables..."
echo "To deploy specific components without modifying code, use these commands:"
echo ""
echo "# Deploy only the frontend"
echo "gcloud builds submit --config=cloudbuild.yaml \\
  --substitutions=_DEPLOY_FRONTEND=true,_DEPLOY_BACKEND=false,_REGION=europe-west2"
echo ""
echo "# Deploy only the backend"
echo "gcloud builds submit --config=cloudbuild.yaml \\
  --substitutions=_DEPLOY_FRONTEND=false,_DEPLOY_BACKEND=true,_REGION=europe-west2"
echo ""
echo "# Deploy to a different region"
echo "gcloud builds submit --config=cloudbuild.yaml \\
  --substitutions=_REGION=us-central1"

echo ""
echo "Setup complete! Update your GitHub Actions workflow with the following values:"
echo "workload_identity_provider: 'projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$POOL_NAME/providers/$PROVIDER_NAME'"
echo "service_account: '$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com'"

echo "To test the setup, push a change to your repository and check the GitHub Actions tab."
