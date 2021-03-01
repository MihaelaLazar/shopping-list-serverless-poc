#!/usr/bin/env bash

PROJECT_ID="crested-axe-227312"
GCP_REGION="europe-west1"
API_ID="shopping-list"
API_DEFINITION="api-gateway.yaml"
SERVICE_ACCOUNT_EMAIL="shopping-list-api-gateway@crested-axe-227312.iam.gserviceaccount.com"
SERVICE_ACCOUNT="shopping-list-api-gateway@crested-axe-227312.iam.gserviceaccount.com"
USER_EMAIL="mihaela.lzr@gmail.com"
CONFIG_ID="shopping-list-api-config"
GATEWAY_ID="shopping-list-gateway-id"

## Configure a service account
#gcloud iam service-accounts create "shopping-list-api-gateway"  --display-name "Shopping List API Gateway Service Account"
#gcloud iam service-accounts add-iam-policy-binding $SERVICE_ACCOUNT --member user:$USER_EMAIL --role roles/iam.serviceAccountUser
#
## Create an API on API Gateway
#gcloud api-gateway apis create $API_ID --project=$PROJECT_ID
#gcloud api-gateway apis describe $API_ID --project=$PROJECT_ID

## Create an API config
#gcloud api-gateway api-configs create $CONFIG_ID \
#  --api=$API_ID --openapi-spec=$API_DEFINITION \
#  --project=$PROJECT_ID --backend-auth-service-account=$SERVICE_ACCOUNT_EMAIL

# Create a gateway
#gcloud api-gateway gateways create $GATEWAY_ID \
#  --api=$API_ID --api-config=$CONFIG_ID \
#  --location=$GCP_REGION --project=$PROJECT_ID


# Describe the created gateway
api_gateway_host_name=$(gcloud api-gateway gateways describe $GATEWAY_ID --location=$GCP_REGION --project=$PROJECT_ID \
--format=json | jq -r .defaultHostname)

# Check the api gateway
curl https://${api_gateway_host_name}/hello

# Securing access by using an API key