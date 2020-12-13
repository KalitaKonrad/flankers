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

# Start queue workers as seperate processes
# monitored with supervisor.d
COPY ./docker/laravel-worker.conf /opt/docker/etc/supervisor.d

WORKDIR /app

RUN chown -R 1000 /app/storage && \
    chmod +x /app/docker/start.sh

RUN composer install

ENTRYPOINT [ "/app/docker/start.sh"]

