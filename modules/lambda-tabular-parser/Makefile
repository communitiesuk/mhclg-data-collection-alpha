.PHONY: test

DOCKER_TEST_IMAGE_NAME := "lambda-excel-parser"

test:
	@echo "Running with $$AWS_ACCESS_KEY_ID in $$AWS_DEFAULT_REGION"
	@docker build . -t $(DOCKER_TEST_IMAGE_NAME)
	@docker run \
		--publish 9000:8080 \
		--env AWS_DEFAULT_REGION=$$AWS_DEFAULT_REGION \
		--env AWS_ACCESS_KEY_ID=$$AWS_ACCESS_KEY_ID \
		--env AWS_SECRET_ACCESS_KEY=$$AWS_SECRET_ACCESS_KEY \
		--env S3_BUCKET="mhclg-core-data-upload" \
		--env S3_PREFIX="tabular-parser/" \
		--name $(DOCKER_TEST_IMAGE_NAME) \
		$(DOCKER_TEST_IMAGE_NAME) &
	@sleep 4
	@curl -i -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -w "\n" -d @test-input.json
	@docker kill $(DOCKER_TEST_IMAGE_NAME)
	@docker rm $(DOCKER_TEST_IMAGE_NAME)
