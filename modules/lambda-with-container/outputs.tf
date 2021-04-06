output "image-url" {
  value = local.remote_image_name
}

output "lambda-function" {
  value = aws_lambda_function.lambda
}

output "lambda-role" {
  value = aws_iam_role.execution
}
