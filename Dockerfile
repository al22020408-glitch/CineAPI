FROM php:8.2-apache

# Copiar archivos al servidor
COPY . /var/www/html/

# Activar mysqli
RUN docker-php-ext-install mysqli

# Permisos
RUN chown -R www-data:www-data /var/www/html