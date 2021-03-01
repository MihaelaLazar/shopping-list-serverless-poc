# GCP provider
provider "google-beta" {
  project      = var.project
  region       = var.region
}


resource "google_api_gateway_api" "shopping-list-api-gateway" {
  provider = google-beta
  api_id = "shopping-list"
}

resource "google_api_gateway_api_config" "shopping-list-api-config" {
  provider = google-beta
  api = google_api_gateway_api.shopping-list-api-gateway.api_id
  api_config_id = "shopping-list-api-config-id"

  openapi_documents {
    document {
      path = "api-gateway.yaml"
      contents = filebase64("./api-gateway/api-gateway.yaml")
    }
  }
  lifecycle {
    create_before_destroy = false
  }
}

resource "google_api_gateway_gateway" "shopping-list-gateway" {
  provider = google-beta
  api_config = google_api_gateway_api_config.shopping-list-api-config.id
  gateway_id = "shopping-list-gateway-id"
}
