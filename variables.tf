variable "default_tags" {
  type = map(string)
  default = {
    application-name       = "MHCLG Data Collection"
    application-identifier = "CLDC"
    business-unit          = "Digital Delivery"
    budget-holder-email    = "katy.armstrong@communities.gov.uk"
    tech-contact-email     = "mhclg-data-collection@googlegroups.com"
    stage                  = "alpha"
  }
}
