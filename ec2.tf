# locals {
#   standard_tags = {
#     application-name       = "Name of your application"
#     application-identifier = "CLDC"
#     business-unit          = "Digital Delivery"
#     budget-holder-email    = "katy.armstrong@communities.gov.uk"
#     tech-contact-email     = "mhclg@communities.gov.uk"
#     stage                  = "alpha"
#   }
# }
#
# resource "aws_instance" "example" {
#   ami           = "ami-096cb92bb3580c759"
#   instance_type = "t2.micro"
#
#   tags = local.standard_tags
# }
