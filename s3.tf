resource "aws_s3_bucket" "core-data" {
  bucket = "mhclg-core-data-upload"
  acl    = "private"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = var.default_tags
}

resource "aws_s3_bucket_public_access_block" "core-data-public-access-block" {
  bucket = aws_s3_bucket.core-data.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
