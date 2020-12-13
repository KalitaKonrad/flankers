#!/bin/sh

php artisan cache:clear
php artisan migrate --force
php artisan db:seed
php artisan scribe:generate

/entrypoint supervisord
