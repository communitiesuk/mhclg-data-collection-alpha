variable "name" {
  description = "The name of the lambda function"
  type        = string
}

variable "name_prefix" {
  description = "A prefix for the docker repo this module creates"
  type        = string
}

variable "tags" {
  description = "The AWS tags to apply to all infrastructure"
  type        = map(string)
}

locals {
  tags              = merge(var.tags, {})
  function_name     = "${var.name_prefix}-${var.name}"
}
