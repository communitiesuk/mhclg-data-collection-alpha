.PHONY: bundle

bundle: ## Bundle the application for deployment to an EC2 instance
	@-rm bundle.tar.gz
	@tar \
		--exclude=node_modules \
		--exclude=.terraform \
		-zcf bundle.tar.gz *
