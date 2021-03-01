provider "google" {
  project = var.project
  region = var.region
}

locals {
  index_zip_name = "index1.zip"
  cloud_functions = {
    "get-shopping-list"  = {
      location = var.region,
      bucket_policy_only = false,
      name = local.index_zip_name,
      source = "../cloud-functions/output/get-shopping-list.zip" ,
      entry_point = "getShoppingList",
      description = "Function for reading shopping list from db."
    }
    "add-shopping-item"  = {
      location = var.region,
      bucket_policy_only = false,
      name = local.index_zip_name,
      source = "../cloud-functions/output/add-shopping-item.zip",
      entry_point = "addShoppingItem",
      description = "Function for adding/updating a shopping item."
    }
    "delete-shopping-item"  = {
      location = var.region,
      bucket_policy_only = false,
      name = local.index_zip_name,
      source = "../cloud-functions/output/delete-shopping-item.zip",
      entry_point = "deleteShoppingItem",
      description = "Function for deleting/removing a shopping item."
    }
    "delete-all-items"  = {
      location = var.region,
      bucket_policy_only = false,
      name = local.index_zip_name,
      source = "../cloud-functions/output/delete-all-items.zip",
      entry_point = "deleteAllItems",
      description = "Function for deleting/removing all shopping items."
    }
    "create-report"  = {
      location = var.region,
      bucket_policy_only = false,
      name = local.index_zip_name,
      source = "../cloud-functions/output/create-report.zip",
      entry_point = "createReport",
      description = "Function for creating report based on shopping list events."
    }
    "read-reports"  = {
      location = var.region,
      bucket_policy_only = false,
      name = local.index_zip_name,
      source = "../cloud-functions/output/read-reports.zip",
      entry_point = "readReports",
      description = "Function for reading reports based on shopping list events."
    }
    "handle-cors"  = {
      location = var.region,
      bucket_policy_only = false,
      name = local.index_zip_name,
      source = "../cloud-functions/output/handle-cors.zip",
      entry_point = "handleCors",
      description = "Function for handling CORS."
    }
  }
}

resource "google_storage_bucket" "map" {
  for_each      = local.cloud_functions
  name               = each.key
  location           = upper(each.value.location)
  storage_class      = "STANDARD"
  force_destroy      = true
}

resource "google_storage_bucket_object" "main-bucket-object" {
  for_each = local.cloud_functions
  name   = each.value.name
  bucket = google_storage_bucket.map[each.key].name
  source = each.value.source
}

resource "google_cloudfunctions_function" "main-cloud-function" {
  for_each = local.cloud_functions
  name        = each.key
  description = each.value.description
  runtime     = "nodejs10"
  provider = google
  available_memory_mb   = 128
  source_archive_bucket = each.key
  source_archive_object = each.value.name

  trigger_http          = true
  entry_point           = each.value.entry_point
  depends_on = [google_storage_bucket_object.main-bucket-object]
}

# IAM entry for a single user to invoke the function
resource "google_cloudfunctions_function_iam_member" "main" {
  for_each = local.cloud_functions
  project        = google_cloudfunctions_function.main-cloud-function[each.key].project
  region         = google_cloudfunctions_function.main-cloud-function[each.key].region
  cloud_function = each.key
  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}