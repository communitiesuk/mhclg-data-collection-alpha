# Lambda with Container module

## Attributes

* `source` - relative path to the lambda-with-container module
* `codebase` - directory where the codebase for the lambda is located
* `name` - a name for the lambda function
* `name_prefix` - prefix for the name prepended to the name attribute (no trailing hyphen)
* `handler` - (default: `main.handler`) the entrypoint for the lambda function (`filename.function`)

## Outputs

* `image-url` - uri of the docker image built for the lambda
* `lambda-function` - terraform resource of the lambda function created
* `lambda-role` - terraform resource of the lambda execution role


## Example

```hcl
module "lambda-with-container" {
  source      = "../lambda-with-container"
  codebase    = path.module
  name        = "lambda-example"
  name_prefix = "shared-prefix"
  handler     = "main.default_handler"
  tags        = {
    some = "value"
  }
}
```