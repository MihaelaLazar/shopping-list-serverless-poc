locals {
  shopping_list_poc_build_path = "../shopping-list-webapp/build"
}

resource "google_storage_bucket" "shopping-list-poc" {
  name = "shopping-list-poc"
  location = "EUROPE-WEST4"
  project = var.gcp_project
  storage_class = "STANDARD"

  versioning {
    enabled = false
  }

  website {
    main_page_suffix = "index.html"
    not_found_page = "index.html"
  }
}

resource "null_resource" "upload_folder_content" {
  triggers = {
    file_hashes = jsonencode({
    for fn in fileset(local.shopping_list_poc_build_path, "**") :
    fn => filesha256("${local.shopping_list_poc_build_path}/${fn}")
    })
  }

  provisioner "local-exec" {
    command = "gsutil cp -r ${local.shopping_list_poc_build_path}/* gs://${google_storage_bucket.shopping-list-poc.name}/"
  }
}

//resource "google_storage_default_object_acl" "shopping-list-poc" {
//  bucket      = google_storage_bucket.shopping-list-poc.name
//  role_entity = ["READER:allUsers"]
//}

//resource "google_storage_default_object_access_control" "shopping-list-poc" {
//  bucket = google_storage_bucket.shopping-list-poc.name
//  role   = "READER"
//  entity = "allUsers"
//}

data "google_iam_policy" "shopping-list-poc-viewer" {
  binding {
    role = "roles/storage.objectViewer"
    members = [
      "allUsers",
    ]
  }
}

resource "google_storage_bucket_iam_policy" "shopping-list-poc" {
  bucket = google_storage_bucket.shopping-list-poc.name
  policy_data = data.google_iam_policy.shopping-list-poc-viewer.policy_data
}

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