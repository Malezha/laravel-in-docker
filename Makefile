#!/usr/bin/make

SHELL = /bin/sh
DC_RUN_ARGS = --rm --user "$(shell id -u):$(shell id -g)"

.PHONY : help composer ssh init test test-cover start stop restart clean
.DEFAULT_GOAL : help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@printf "\033[33m%s:\033[0m\n" 'Available commands'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[32m%-18s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install app
	make env
	make build
	make composer-install
	make npm-install
	make start
	make init

composer-install: ## Install web dependencies
	docker-compose run $(DC_RUN_ARGS) --no-deps app composer install --ansi --prefer-dist

npm-install: ## Install node dependencies
	docker-compose run $(DC_RUN_ARGS) --no-deps node npm install

init: ## Make full application initialization
	docker-compose run $(DC_RUN_ARGS) app php artisan key:generate --ansi
	docker-compose run $(DC_RUN_ARGS) app php artisan migrate --force --seed
	-docker-compose run $(DC_RUN_ARGS) --no-deps app php artisan storage:link

ssh: ## Start shell into app container
	docker-compose run $(DC_RUN_ARGS) app sh

test: ## Execute app tests
	docker-compose run $(DC_RUN_ARGS) app composer test

build: ## Build php images
	APP_UID=$(shell id -u) APP_GID=$(shell id -g) docker-compose build app nginx node
	APP_UID=$(shell id -u) APP_GID=$(shell id -g) docker-compose build web queue cron

start: ## Create and start containers
	APP_UID=$(shell id -u) APP_GID=$(shell id -g) docker-compose up --detach --remove-orphans nginx web queue cron node
	@printf "\n   \e[30;42m %s \033[0m\n\n" 'Navigate your browser to ⇒ https://localhost';

stop: ## Stop containers
	docker-compose down

env: ## Copy env file
	cp -n .env.example .env

restart: stop start ## Restart all containers
