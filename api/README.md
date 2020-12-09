# First steps 
## Requirements
- composer 2.0
- php >= 7.4

## Development setup
```bash
# Don't forget to fill mailtrap or other mail proxy configuration 
# if you want to test mail sending functionality
copy env.example .env
composer install

# Provision file based database file
touch database/database.sqlite

php artisan key:generate
php artisan jwt:secret
php artisan migrate
```

## Starting local dev server
```bash
php artisan serve
```

## Running tests
```bash
composer test
composer coverage
```

# Documenation
- Developer guide is available [here](https://github.com/sekcja-memow/flankers/wiki) on github
- API documentation is available [here](https://flankers-api.lados.dev)
