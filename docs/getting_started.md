# Requirements

Before you deploy, you must have the following in place:

* [GCP Account](https://cloud.google.com/)
* [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
* [Node 10 or greater](https://nodejs.org/en/download/)

# How to

Follow these instructions to deploy the Serverless Shopping list application:

    1. create a file terraform.tfvars containing the following:
        * gcp_project = "< project id >"
        * region = "<>"
        * zone = "<>"
        * firestore_zone = "<>"
        * app_engine_region = "<>"
    
    2. cd infrastructure
    3. terraform init
    4. terraform plan
    5. terraform apply