resource "aws_api_gateway_rest_api" "data-collection" {
  name               = "mhclg-data-collection"
  binary_media_types = ["*/*"]
  tags               = var.default_tags
}

resource "aws_api_gateway_deployment" "alpha" {
  rest_api_id = aws_api_gateway_rest_api.data-collection.id
}

resource "aws_api_gateway_stage" "alpha" {
  rest_api_id   = aws_api_gateway_rest_api.data-collection.id
  deployment_id = aws_api_gateway_deployment.alpha.id
  stage_name    = "alpha"
  tags          = var.default_tags
}

resource "aws_api_gateway_resource" "tabular-parser" {
  rest_api_id = aws_api_gateway_rest_api.data-collection.id
  parent_id   = aws_api_gateway_rest_api.data-collection.root_resource_id
  path_part   = "test"
}

resource "aws_api_gateway_method" "tabular-parser" {
  rest_api_id   = aws_api_gateway_rest_api.data-collection.id
  resource_id   = aws_api_gateway_resource.tabular-parser.id
  http_method   = "GET"
  authorization = "NONE"
}

module "lambda-tabular-parser" {
  source           = "./modules/lambda-tabular-parser"
  s3_upload_bucket = aws_s3_bucket.core-data
  rest_api         = aws_api_gateway_rest_api.data-collection
  api_stage        = aws_api_gateway_stage.alpha
  tags             = var.default_tags
}

output "tabular-parser-url" {
  value = module.lambda-tabular-parser.public_endpoint
}
