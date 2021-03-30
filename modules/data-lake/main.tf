variable "tags" {
  type        = map(string)
  description = "Tags to use for each resource, will have Name appended where applicable"
}

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

  tags = var.tags
}

resource "aws_s3_bucket_public_access_block" "core-data-public-access-block" {
  bucket = aws_s3_bucket.core-data.arn

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

data "aws_iam_policy_document" "AWSLambdaTrustPolicy" {
  statement {
    actions    = ["sts:AssumeRole"]
    effect     = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "s3_data_processing_role" {
  name               = "s3_data_processing_role"
  assume_role_policy = data.aws_iam_policy_document.AWSLambdaTrustPolicy.json
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.s3_data_processing_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_iam_policy_document" "lambda_s3" {
  statement {
    actions   = ["s3:GetObject", "S3:PutObject"]
    resources = [aws_s3_bucket.core-data.arn]
    effect = "Allow"
  }
}

# Policy for ECR


resource "aws_ecr_repository" "mhclg-data-lake" {
  name                 = "mhclg-data-lake"
  image_tag_mutability = "IMMUTABLE"
}

# Push image to ECR

data "aws_ecr_image" "lambda_image" {
  repository_name = aws_ecr_repository.mhclg-data-lake.name
  image_tag       = "latest"
}

resource "aws_lambda_function" "xlsx_to_parquet_function" {
  function_name    = "xlsx_to_parquet"
  handler          = "handler"
  role             = aws_iam_role.s3_data_processing_role.arn
  image_uri        = aws_ecr_image.lambda_image.id
  runtime          = "python3.8"
  tags             = var.tags
}
