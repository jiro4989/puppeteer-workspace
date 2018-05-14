.PHONY: default
default: up

.PHONY: stop
stop:
	docker-compose stop

.PHONY: clean
clean: stop
	docker-compose rm -f

.PHONY: build
build: clean
	docker-compose build

.PHONY: up
up: build
	docker-compose up -d

.PHONY: login
login: up
	docker exec -it pup /bin/bash

