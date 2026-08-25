# Snippets

Aplicação Laravel + React utilizando Docker para o ambiente de desenvolvimento.

## Requisitos

* Docker
* Docker Compose

## Setup

Clone o projeto e crie o arquivo de ambiente:

```bash id="9c4wqm"
cp .env.example .env
```

Suba os containers:

```bash id="uwj3rj"
docker compose up -d --build
```

Instale as dependências:

```bash id="dmyzwp"
docker compose exec app composer install
docker compose exec app npm install
```

Configure a aplicação:

```bash id="ib47mc"
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate
docker compose exec app php artisan db:seed
```

A aplicação estará disponível em:

`http://localhost:8000`

## Executando

Depois do primeiro setup, basta iniciar o ambiente com:

```bash id="p33dnf"
docker compose up -d
```

Para parar:

```bash id="4r8ovv"
docker compose down
```

Para acompanhar os logs:

```bash id="g2sb2c"
docker compose logs -f app
```

## Comandos úteis

```bash id="b0frff"
# Artisan
docker compose exec app php artisan <comando>

# Composer
docker compose exec app composer <comando>

# npm
docker compose exec app npm <comando>

# Terminal do container
docker compose exec app bash
```
