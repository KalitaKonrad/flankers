FROM webdevops/php-nginx-dev:7.4

# Set any ENVs
ARG APP_KEY=${APP_KEY}
ARG APP_NAME=${APP_NAME}
ARG APP_URL=${APP_URL}
ARG APP_ENV=${APP_ENV}
ARG APP_DEBUG=${APP_DEBUG}
ARG DB_CONNECTION=${DB_CONNECTION}

COPY ./ /app

WORKDIR /app

RUN touch database/database.sqlite && \
    mkdir -p /app/storage/logs && \
    touch /app/storage/logs/laravel.log && \
    chmod -R 777 /app/storage

RUN composer install && \
    php artisan migrate && \
    php artisan scribe:generate
