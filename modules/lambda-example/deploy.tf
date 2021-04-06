module "lambda-with-container" {
  source      = "../lambda-with-container"
  codebase    = path.module
  name        = "lambda-example"
  name_prefix = "mhclg-data-collection"
  handler     = "main.default_handler"
  tags        = {}
}

resource "aws_s3_bucket" "bucket" {
  bucket = "mhclg-data-collection-lambda-example"
}

resource "aws_lambda_permission" "allow_bucket_to_trigger_function" {
  action        = "lambda:InvokeFunction"
  function_name = module.lambda-with-container.lambda-function.arn
  source_arn    = aws_s3_bucket.bucket.arn
  principal     = "s3.amazonaws.com"
}

resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.bucket.id

  lambda_function {
    lambda_function_arn = module.lambda-with-container.lambda-function.arn
    events              = ["s3:ObjectCreated:*"]
  }

  depends_on = [
    aws_lambda_permission.allow_bucket_to_trigger_function,
  ]
}
