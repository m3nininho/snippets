#!/usr/bin/env bash
set -euo pipefail

cd /var/www/html

mkdir -p \
    database \
    storage/app/private \
    storage/app/public \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache

[ -f database/database.sqlite ] || touch database/database.sqlite

if [ ! -f vendor/autoload.php ]; then
    composer install --no-interaction --prefer-dist
fi

if [ ! -d node_modules/.bin ]; then
    if [ -f package-lock.json ]; then
        npm ci
    else
        npm install
    fi
fi

php artisan optimize:clear >/dev/null 2>&1 || true

exec "$@"
