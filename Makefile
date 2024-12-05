.PHONY: up down restart logs ps build stop start clean help migrate migrate-down

COMPOSE_FILE=docker-compose.yaml
PROJECT_NAME=beat-bridge
TEST_COMPOSE_PATH=./test/docker-compose.yaml

up:
	@docker-compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) up -d

down:
	@docker-compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) down

restart: down up

logs:
	@docker-compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) logs -f

build:
	@docker-compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) build

stop:
	@docker-compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) stop

start:
	@docker-compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) start

clean: down
	@docker-compose -f $(COMPOSE_FILE) -p $(PROJECT_NAME) rm -f
	@docker volume prune -f

help:
	@echo "Comandos disponíveis:"
	@echo "  make up        - Start all containers detached"
	@echo "  make down      - Stop all containers"
	@echo "  make restart   - Restart all containers"
	@echo "  make logs      - Show containers logs"
	@echo "  make build     - build docker images"
	@echo "  make stop      - Stop coall containers"
	@echo "  make start     - Start stopped containers"
	@echo "  make clean     - Remove containers and volumes"

migrate:
	@sql-migrate up --config ./migrations/config/dbconfig.yml
migrate-down:
	@sql-migrate down --config ./migrations/config/dbconfig.yml --limit $(limit)

start-test-containers:
	@docker-compose -f $(TEST_COMPOSE_PATH) -p $(PROJECT_NAME) up -d --build

stop-test-containers:
	@docker-compose -f $(TEST_COMPOSE_PATH) -p $(PROJECT_NAME) down --volumes
