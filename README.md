# Yet Another Express Boilerplate

## Installation steps (docker)

### Image Build

1. Clone this repo.
1. Generate .env file from .env.example: `cp .env.example .env`
1. Set `.env` file variables accordingly
1. Build the docker compose project: `docker compose build`

### Project start

1. Run the docker project: `docker compose up -d`

### Development mode

Generate a `docker-compose.override.yml` file in the same folder as `docker-compose.yml`, with the following content:
```yml
services:
  app:
    command: npm run dev
    volumes:
      - ./:/app
```
Then, start the docker project: `docker compose up -d`

