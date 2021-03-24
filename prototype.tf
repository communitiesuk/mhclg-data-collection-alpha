module "prototype-kit" {
  source      = "./modules/prototype-kit"
  tags        = var.default_tags
  private_ssh = var.prototype_kit_private_ssh
  public_ssh  = var.prototype_kit_public_ssh
}

output "prototype_public_url" {
  value = module.prototype-kit.prototype_public_url
}
