# MHCLG Data Collection Alpha

### Required Setup

This project uses Terraform to provision infrastructure. It uses AWS S3 (with Dynamo DB locking) as the state store backend. These are described in `provider.tf`. Pull requests run Terraform format check and Terraform plan. Merges to main run Terraform Apply as well.

### Modules

#### Prototyping Kit

The prototyping kit can be found under [modules/prototype-kit/codebase](./modules/prototype-kit/codebase).

To deploy a change to the kit, make any required edits, commit them and push them to the `main` branch, these changes
are deployed via GitHub actions and generally take a minute or two to reflect. 

Please bear in mind that pushing a change will **bring down the prototype for a few seconds and could reset session 
data** so check that no one is currently using it.

#### Lambda in Container

There is a terraform module that allows for the deployment of a lambda function that runs inside a docker container. 

See the [module readme](./modules/lambda-with-container) for more information.

See the [example lambda](./modules/lambda-example) for ideas on how to use this.
