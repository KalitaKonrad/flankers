#!/bin/sh
cd /app

php artisan cache:clear
php artisan migrate:fresh
php artisan migrate --force
php artisan db:seed

mkdir -p /app/storage/framework/{session,views,cache}
php artisan scribe:generate

chown -R 1000 /app/storage

/entrypoint supervisord
