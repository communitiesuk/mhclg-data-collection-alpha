resource "aws_lambda_function" "lambda" {
  function_name = local.function_name
  package_type  = "Image"
  image_uri     = local.remote_image_name
  role          = aws_iam_role.execution.arn
  tags          = local.tags

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [null_resource.build-image]
}

resource "aws_iam_role" "execution" {
  name               = local.function_name
  assume_role_policy = data.aws_iam_policy_document.execution-role.json
  tags               = local.tags
}

data "aws_iam_policy_document" "execution-role" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      identifiers = ["lambda.amazonaws.com"]
      type        = "Service"
    }
  }
}

resource "aws_iam_role_policy_attachment" "basic" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.execution.name
}
