terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.32"
    }
  }

  # Requires S3 bucket & Dynamo DB to be configured, please see README.md
  backend "s3" {
    bucket         = "datacollection-dev-terraform-remote-state-storage"
    encrypt        = true
    dynamodb_table = "DataCollection-Dev-terraform-state-lock-dynamo"
    key            = "state"
    region         = "eu-west-2"
  }

  required_version = "~> 0.14"
}

provider "aws" {
  region = "eu-west-2"
}
