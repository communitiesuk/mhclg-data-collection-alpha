build:
	docker build -t mhclg/prototype-kit .

start: build
	docker run --name mhclg-prototype -d -p "3000:3000" mhclg/prototype-kit

stop:
	docker kill mhclg-prototype
