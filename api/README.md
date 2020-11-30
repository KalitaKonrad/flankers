# Requirements
## Development
- php > 7.3 with pdo_sqlite extension

# Installation
Make sure the database file is installed.
```bash
copy .env.example .env
composer install
php artisan migrate
```

## Starting development env
```
php artisan serve
```
