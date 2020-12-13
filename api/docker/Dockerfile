FROM webdevops/php-nginx-dev:7.4

# Set any ENVs
ARG APP_KEY=${APP_KEY}
ARG JWT_SECRET=${JWT_SECRET}
ARG APP_NAME=${APP_NAME}
ARG APP_URL=${APP_URL}
ARG APP_ENV=${APP_ENV}
ARG APP_DEBUG=${APP_DEBUG}
ARG DB_CONNECTION=${DB_CONNECTION}

# Copy application code to easily reachable directory
COPY ./ /app

# Ensure supervisord is installed
RUN apt-get install supervisor

# Start queue workers as seperate processes
# monitored with supervisor.d
COPY ./laravel-worker.conf /etc/supervisor/conf.d

WORKDIR /app

RUN chown -R 1000 /app/storage

RUN composer install && \
    php artisan cache:clear && \
    php artisan migrate --force && \
    php artisan db:seed && \
    php artisan scribe:generate
