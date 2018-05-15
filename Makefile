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
login:
	docker exec -it pup_app /bin/bash

.PHONY: login_db
login_db:
	docker exec -it pup_db /bin/bash

