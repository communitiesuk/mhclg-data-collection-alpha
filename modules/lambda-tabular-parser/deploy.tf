variable "s3_upload_bucket" {
  description = "The S3 bucket resource"
}

variable "tags" {
  description = "The AWS tags to apply to all infrastructure"
  type        = map(string)
}

variable "rest_api" {
  description = "The rest api this function integrates with"
}

module "lambda-with-container" {
  source      = "../lambda-with-container"
  codebase    = path.module
  name        = "lambda-tabular-parser"
  name_prefix = "mhclg-data-collection"
  environment = {
    S3_BUCKET = var.s3_upload_bucket.bucket
    S3_PREFIX = "tabular-parser/"
  }
  timeout = 15
  memory  = 256
  tags    = var.tags
}

resource "aws_iam_role_policy_attachment" "lambda_accesses_s3" {
  role       = module.lambda-with-container.lambda-role.name
  policy_arn = aws_iam_policy.lambda_accesses_s3.arn
}

resource "aws_iam_policy" "lambda_accesses_s3" {
  policy = data.aws_iam_policy_document.lambda_accesses_s3.json
}

data "aws_iam_policy_document" "lambda_accesses_s3" {
  statement {
    effect  = "Allow"
    actions = ["s3:PutObject"]
    resources = [
      "${var.s3_upload_bucket.arn}/tabular-parser",
      "${var.s3_upload_bucket.arn}/tabular-parser/*"
    ]
  }
}

resource "aws_api_gateway_resource" "tabular-parser" {
  rest_api_id = var.rest_api.id
  parent_id   = var.rest_api.root_resource_id
  path_part   = "parse-tabular"
}

resource "aws_api_gateway_method" "tabular-parser" {
  rest_api_id   = var.rest_api.id
  resource_id   = aws_api_gateway_resource.tabular-parser.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = var.rest_api.id
  resource_id = aws_api_gateway_method.tabular-parser.resource_id
  http_method = aws_api_gateway_method.tabular-parser.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = module.lambda-with-container.lambda-function.invoke_arn
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda-with-container.lambda-function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:${var.rest_api.id}/*/${aws_api_gateway_method.tabular-parser.http_method}${aws_api_gateway_resource.tabular-parser.path}"
}
