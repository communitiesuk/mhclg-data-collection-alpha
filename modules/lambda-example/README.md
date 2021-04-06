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

## Testing locally

If you expose your AWS credentials with something like 
[aws-vault](https://github.com/99designs/aws-vault) you can test your lambda 
function locally.

```shell
$ aws-vault exec mhclg-data-collection -- make test
```

```text
Running with AKIAAGESOER1346NG in eu-west-2
[+] Building 1.5s (10/10) FINISHED                                                                 
 => [internal] load build definition from Dockerfile                                          0.4s
 => => transferring dockerfile: 37B                                                           0.0s
 => [internal] load .dockerignore                                                             0.3s
 => => transferring context: 34B                                                              0.0s
 => [internal] load metadata for public.ecr.aws/lambda/python:3.8                             0.8s
 => [1/5] FROM public.ecr.aws/lambda/python:3.8@sha256:18cb8cf5a9262e69bc86b39a4c8743cc02d81  0.0s
 => [internal] load build context                                                             0.1s
 => => transferring context: 1.68kB                                                           0.0s
 => CACHED [2/5] RUN pip install --upgrade pip                                                0.0s
 => CACHED [3/5] COPY ./requirements.txt ./                                                   0.0s
 => CACHED [4/5] RUN pip install -r requirements.txt                                          0.0s
 => [5/5] COPY ./* ./                                                                         0.1s
 => exporting to image                                                                        0.1s
 => => exporting layers                                                                       0.0s
 => => writing image sha256:1c421b6c5b5503df1a7cb835e88e40f7ace2e623549da140789476fae8cee95b  0.0s
 => => naming to docker.io/library/lambda-example-test                                        0.0s
time="2021-04-06T13:05:37.998" level=info msg="exec '/var/runtime/bootstrap' (cwd=/var/task, handler=)"
time="2021-04-06T13:05:39.451" level=info msg="extensionsDisabledByLayer(/opt/disable-extensions-jwigqn8j) -> stat /opt/disable-extensions-jwigqn8j: no such file or directory"
time="2021-04-06T13:05:39.451" level=warning msg="Cannot list external agents" error="open /opt/extensions: no such file or directory"
START RequestId: 7694e996-550d-43d7-86d7-aa06608d4452 Version: $LATEST
event: {'Records': [{'eventVersion': '2.0', 'eventSource': 'aws:s3', 'awsRegion': 'us-west-2', 'eventTime': '1970-01-01T00:00:00.000Z', 'eventName': 'ObjectCreated:Put', 'userIdentity': {'principalId': 'EXAMPLE'}, 'requestParameters': {'sourceIPAddress': '127.0.0.1'}, 'responseElements': {'x-amz-request-id': 'EXAMPLE123456789', 'x-amz-id-2': 'EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH'}, 's3': {'s3SchemaVersion': '1.0', 'configurationId': 'testConfigRule', 'bucket': {'name': 'mhclg-data-collection-lambda-example', 'ownerIdentity': {'principalId': 'EXAMPLE'}, 'arn': 'arn:aws:s3:::mhclg-data-collection-lambda-example'}, 'object': {'key': 'some-file.csv', 'size': 1024, 'eTag': '0123456789abcdef0123456789abcdef', 'sequencer': '0A1B2C3D4E5F678901'}}}]}
HTTP/1.1 200 OK
Date: Tue, 06 Apr 2021 13:05:39 GMT
Content-Length: 77
Content-Type: text/plain; charset=utf-8

{"bucket": "mhclg-data-collection-lambda-example", "object": "some-file.csv"}
END RequestId: 7694e996-550d-43d7-86d7-aa06608d4452
REPORT RequestId: 7694e996-550d-43d7-86d7-aa06608d4452  Init Duration: 0.19 ms  Duration: 73.32 msBilled Duration: 100 ms  Memory Size: 3008 MB    Max Memory Used: 3008 MB
```
