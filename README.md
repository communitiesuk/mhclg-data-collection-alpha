# MHCLG Data Collection Alpha

### Required Setup

This project uses Terraform to provision infrastructure. It uses AWS S3 (with Dynamo DB locking) as the state store backend. These are described in `provider.tf`. Pull requests run Terraform format check and Terraform plan. Merges to main run Terraform Apply as well.
