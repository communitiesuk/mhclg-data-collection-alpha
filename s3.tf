resource "aws_s3_bucket" "core-data" {
  bucket = "mhclg-core-data-upload"
  acl    = "private"
  versioning {
    enabled = true
  }
  tags = var.default_tags
}
