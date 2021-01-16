# First steps 
## Requirements
- composer 2.0
- php >= 7.4

## Development setup
First and foremost, you have to copy .env.example file, and fill all required
(those not commented or with empty space after '=' sign). Commented values
can be enabled and customized to your taste but are otherwise unused,
and the app should support them out of the box.

```bash
copy env.example .env
composer install

# Provision file based database file
touch database/database.sqlite

php artisan key:generate
php artisan jwt:secret
php artisan migrate
```

By default, project needs websocket server listening 
for connections and http server you can start them with:
## Starting local dev server
```bash
php artisan serve
php artisan websockets:serve
```

In addition, there are queued jobs which are executed
in the background. By default, they are handled instantly
using ``sync`` queue driver, but while testing some time dependent
features that is not ideal. You will have to change ``QUEUE_CONNECTION``
env variable to ``database`` and start a queue worker which will proccess
incoming jobs when the time is right. To start the worker, run:

```bash
php artisan queue:work --sleep=1 # Check and proccess jobs every second
```

## Running tests
```bash
composer test
composer coverage
```


# Documentation
- Developer guide is available [here](https://github.com/sekcja-memow/flankers/wiki) on github
- API documentation is available [here](https://flapi.lados.dev/docs)
