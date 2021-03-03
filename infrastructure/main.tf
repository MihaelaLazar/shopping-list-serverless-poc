module "api-gateway" {
  source = "./api-gateway"
  project = var.gcp_project
  region = var.region
}

module "cloud-functions" {
  source = "./cloud-functions"
  project = var.gcp_project
  region = var.region
}

module "ui-apps" {
  source = "./ui-apps"
  project = var.gcp_project
  region = "EUROPE-WEST4"
}

resource "google_pubsub_topic" "shopping-list-event" {
  name = "shopping-list-event"
  project = var.gcp_project
}

resource "google_pubsub_subscription" "shopping-list-event" {
  name = "shopping-list-event"
  topic = google_pubsub_topic.shopping-list-event.name
  project = var.gcp_project
}

resource "google_cloud_scheduler_job" "report-events-scheduler" {
  name = "report-events-scheduler"
  project = var.gcp_project
  region = var.app_engine_region
  schedule = "0 16 * * *"

  http_target {
    uri = module.cloud-functions.create-report-cf-trigger-url
  }
}