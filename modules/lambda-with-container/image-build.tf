data "docker_registry_image" "image" {
  name = local.base_image
}

data "archive_file" "codebase" {
  source_dir  = var.codebase
  output_path = "${path.module}/${var.name}.zip"
  type        = "zip"
}

resource "null_resource" "build-image" {
  triggers = {
    code-files-changed = data.archive_file.codebase.output_base64sha256
    base-image-changed = data.docker_registry_image.image.sha256_digest
  }

  provisioner "local-exec" {
    command = "aws ecr get-login-password | docker login --username AWS --password-stdin ${local.ecr_hostname}"
  }

  provisioner "local-exec" {
    working_dir = var.codebase
    command     = "docker build . -t ${local.remote_image_name} --build-arg BASE_IMAGE --build-arg CODEBASE --build-arg HANDLER --build-arg REQUIREMENTS"
  }

  provisioner "local-exec" {
    command = "docker push ${local.remote_image_name}"
  }

  depends_on = [
    aws_ecr_repository.lambda,
    aws_ecr_repository_policy.lambda,
    data.archive_file.codebase,
  ]
}
