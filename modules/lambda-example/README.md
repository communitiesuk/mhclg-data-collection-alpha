# Lambda Example

This is an example to demo the [lambda-with-container](../lambda-with-container) terraform module.

You will find most of this can just be copied to a new directory as a starting point for new functions.

This example reacts to `s3:ObjectCreated` events by triggering the lambda function.

* [`main.py`](./main.py) - the main entrypoint, there is a single function that is exposed via the `handler` variable in 
  the [lambda-with-container](../lambda-with-container) module.
* [`requirements.txt`](./requirements.txt) - the required files that are installed on the docker image
* [`deploy.tf`](./deploy.tf) - includes the [lambda-with-container](../lambda-with-container) module and creates an S3 
  bucket to use with the lambda function.
* [`.dockerignore`](./.dockerignore) - docker ignore file to easily ignore files, `*.tf` ignored by default
* [`Dockerfile`](./Dockerfile) - describes building a docker image for this code
* [`README.md`](./README.md) - this file
