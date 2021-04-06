resource "aws_ecr_repository" "lambda" {
  name = local.function_name
  tags = local.tags
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_ecr_lifecycle_policy" "rotate_old_images" {
  repository = aws_ecr_repository.lambda.name
  policy     = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last 3 images",
            "selection": {
                "tagStatus": "any",
                "countType": "imageCountMoreThan",
                "countNumber": 3
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}

resource "aws_ecr_repository_policy" "lambda" {
  repository = aws_ecr_repository.lambda.name
  policy     = data.aws_iam_policy_document.ecr_policy.json
}

data "aws_iam_policy_document" "ecr_policy" {
  statement {
    sid    = "ECRAccessPolicy"
    effect = "Allow"
    principals {
      identifiers = [data.aws_caller_identity.current.arn]
      type        = "AWS"
    }
    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
      "ecr:DescribeRepositories",
      "ecr:GetRepositoryPolicy",
      "ecr:ListImages",
      "ecr:PutImage",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload",
    ]
  }
  statement {
    sid    = "LambdaECRAccessPolicy"
    effect = "Allow"
    principals {
      identifiers = ["lambda.amazonaws.com"]
      type        = "Service"
    }
    actions = [
      "ecr:BatchGetImage",
      "ecr:GetDownloadUrlForLayer",
      "ecr:SetRepositoryPolicy",
      "ecr:DeleteRepositoryPolicy",
      "ecr:GetRepositoryPolicy",
    ]
  }
}
