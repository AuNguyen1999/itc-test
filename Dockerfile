FROM php:8.2.0-fpm

RUN apt-get update && apt-get install -y \
  libpng-dev \
  zlib1g-dev \
  libxml2-dev \
  libzip-dev \
  libonig-dev \
  zip \
  curl \
  unzip \
  cron \
  vim \
  git \
  default-mysql-client \
  libfreetype6-dev \
  libjpeg62-turbo-dev \
  libpng-dev \
  && docker-php-ext-configure gd --with-freetype --with-jpeg\
  && docker-php-ext-install -j$(nproc) gd \
  && docker-php-ext-install pdo_mysql \
  && docker-php-ext-install pdo_mysql \
  && docker-php-ext-install mysqli \
  && docker-php-ext-install opcache \
  && docker-php-ext-install zip \
  && docker-php-ext-install mbstring \
  && docker-php-ext-install bcmath 

RUN echo 'export PATH="$PATH:/var/www/html/vendor/bin"' >> ~/.bashrc

RUN groupadd -r nginx \
  && useradd -r -s /sbin/nologin -d /dev/null -g nginx nginx

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN echo 'alias drush="/var/www/html/vendor/drush/drush/drush"' >> ~/.bashrc

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g gulp

SHELL ["/bin/bash", "-c", "source ~/.bashrc"]

EXPOSE 9000
ADD ./entrypoint.sh /

