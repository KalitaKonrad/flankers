#!/bin/sh
cd /app

php artisan cache:clear
php artisan migrate --force
php artisan db:seed
php artisan scribe:generate

chown -R 1000 /app/storage

/entrypoint supervisord
