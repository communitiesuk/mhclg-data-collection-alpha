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

data "aws_iam_policy_document" "s3-processing-policy-document" {
  statement {
    actions   = ["s3:ListBucket", "s3:GetObject", "s3:PutObject"]
    resources = [aws_s3_bucket.core-data.arn]
    effect = "Allow"
  }
}

resource "aws_iam_policy" "s3-processing-policy" {
   name        = "s3-processing-policy"
   description = "Policy that allows interacting with core data s3 data bucket"
   policy = data.aws_iam_policy_document.s3-processing-policy-document.json
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

resource "aws_iam_role" "s3-data-processing-role" {
  name               = "s3-data-processing-role"
  assume_role_policy = data.aws_iam_policy_document.AWSLambdaTrustPolicy.json
}

resource "aws_iam_role_policy_attachment" "s3-data-processing-s3-attachment" {
  role       = aws_iam_role.s3-data-processing-role.name
  policy_arn = aws_iam_policy.s3-processing-policy.arn
}

resource "aws_ecr_repository" "mhclg-data-lake" {
  name                 = "mhclg-data-lake"
  image_tag_mutability = "IMMUTABLE"
}

data "aws_iam_policy_document" "ecr-policy-document" {
  statement {
    actions   = ["ecr:BatchCheckLayerAvailability", "ecr:BatchGetImage", "ecr:CompleteLayerUpload",
                 "ecr:GetDownloadUrlForLayer", "ecr:GetLifecyclePolicy", "ecr:InitiateLayerUpload",
                 "ecr:PutImage","ecr:UploadLayerPart"
               ]
    effect = "Allow"
  }
}

resource "aws_iam_policy" "ecr-policy" {
   name        = "ecr-policy"
   description = "Policy that allows pushing and pulling docker images from ECR"
   policy = data.aws_iam_policy_document.ecr-policy-document.json
}

data "aws_ecr_image" "lambda-image" {
  repository_name = aws_ecr_repository.mhclg-data-lake.name
  image_tag       = "latest"
}

resource "aws_lambda_function" "xlsx_to_parquet_function" {
  function_name    = "xlsx_to_parquet"
  handler          = "handler"
  role             = aws_iam_role.s3-data-processing-role.arn
  image_uri        = aws_ecr_image.lambda-image.id
  runtime          = "python3.8"
  tags             = var.tags
}
