build:
	docker build -t mhclg/prototype-kit .

start: stop build
	- docker run --env TABULAR_PARSER_URI=https://a0qavofh1f.execute-api.eu-west-2.amazonaws.com/alpha/parse-tabular --name mhclg-prototype -d -p "3000:3000" -v $$(pwd):/usr/src/app mhclg/prototype-kit
	- (which python && python -m webbrowser http://localhost:3000 & ) || 0
	- docker logs -f mhclg-prototype

stop:
	- docker kill mhclg-prototype
	- docker rm mhclg-prototype

log:
	- docker logs -f mhclg-prototype

