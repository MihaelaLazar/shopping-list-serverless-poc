output "cloud-functions" {
  value = ""
}

output "create-report-cf-trigger-url" {
  description = "Report creator cloud function name"
  value = google_cloudfunctions_function.main-cloud-function["create-report"].https_trigger_url
}
