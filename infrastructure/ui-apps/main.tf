locals {
  ui_apps = {
    "shopping-list-poc" = {
      app_path = "../shopping-list-webapp"
      build_path = "../shopping-list-webapp/build"
      location = var.region
      main_page_suffix = "index.html"
      not_found_page = "index.html"
    }
    "shopping-list-report" = {
      app_path = "../shopping-list-report"
      build_path = "../shopping-list-report/build"
      location = var.region
      main_page_suffix = "index.html"
      not_found_page = "index.html"
    }
  }

}

resource "google_storage_bucket" "main_storage_bucket" {
  for_each = local.ui_apps
  name = each.key
  location = each.value.location
  project = var.project
  storage_class = "STANDARD"
  force_destroy = true
  versioning {
    enabled = false
  }

  website {
    main_page_suffix = each.value.main_page_suffix
    not_found_page = each.value.not_found_page
  }
}

resource "null_resource" "main_upload_folder_content" {
  for_each = local.ui_apps
  triggers = {
    file_hashes = jsonencode({
    for fn in fileset(each.value.build_path, "**") :
    fn => filesha256("${each.value.build_path}/${fn}")
    })
  }

  provisioner "local-exec" {
    command = "(cd ${each.value.app_path} && npm run-script build) && gsutil cp -r ${each.value.build_path}/* gs://${google_storage_bucket.main_storage_bucket[each.key].name}/"
  }
}

resource "google_storage_bucket_iam_policy" "main_bucket_iam_policy" {
  for_each = local.ui_apps
  bucket = google_storage_bucket.main_storage_bucket[each.key].name
  policy_data = data.google_iam_policy.shopping-list-poc-viewer.policy_data
}

data "google_iam_policy" "shopping-list-poc-viewer" {
  binding {
    role = "roles/storage.objectViewer"
    members = [
      "allUsers",
    ]
  }
}
