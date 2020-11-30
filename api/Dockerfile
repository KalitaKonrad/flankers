FROM webdevops/php-nginx-dev:7.4

COPY ./ /app

WORKDIR /app

RUN touch database/database.sqlite

RUN composer install && php artisan migrate && php artisan scribe:generate
