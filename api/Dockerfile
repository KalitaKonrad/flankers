FROM webdevops/php-nginx-dev:7.4

# Set any ENVs
ARG APP_KEY=${APP_KEY}
ARG JWT_SECRET=${JWT_SECRET}
ARG APP_NAME=${APP_NAME}
ARG APP_URL=${APP_URL}
ARG APP_ENV=${APP_ENV}
ARG APP_DEBUG=${APP_DEBUG}
ARG DB_CONNECTION=${DB_CONNECTION}

COPY ./ /app

WORKDIR /app

RUN touch /app/database/database.sqlite && \
    chmod -R 777 database && \
    mkdir -p /app/storage/logs && \
    touch /app/storage/logs/laravel.log && \
    chmod -R 777 /app/storage

RUN composer install && \
    php artisan migrate && \
    php artisan db:seed --class StagingSeeder && \
    php artisan scribe:generate
