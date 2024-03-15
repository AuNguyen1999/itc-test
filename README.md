### Building project

## Features

- Php 8.2.0
- Nginx 1.9
- Mariadb 10.4

## Requirements

- [Git](https://git-scm.com/downloads)
- [Docker](https://store.docker.com/editions/community/docker-ce-desktop-mac) >= 25.0.3

## Installation

### Clone source docker

```bash
git clone https://github.com/AuNguyen1999/itc-test.git
```

After that, let's following below command:

```bash
cd itc-test
```

```bash
docker-compose build
```

Waiting for a while to finish building containers. Then start run containers.

```bash
docker-compose up -d
```

### Setup Drupal

Open the workspace container, then install Composer and import the database for the project

```bash
docker exec -it itc_web bash
```

```bash
composer install
```

```bash
zcat database/itc-test.sql.gz | drush sqlc
```

### Setup Frontend

If you change CSS and JS, the steps to rebuild are as follows.

```bash
docker exec -it itc_web bash
```

```bash
cd web/themes/custom/itc
```

```bash
npm install
```

```bash
gulp build
```

### Site

- Login page: [http://localhost:8081/user/login](http://localhost:8081/user/login)
- About page: [http://localhost:8081/about-us](http://localhost:8081/about-us)
- Admin account: admin/TeStROWatEMe

### Demo

![DEMO](https://github.com/AuNguyen1999/itc-test/assets/103050992/c50bb8f0-9ea9-4576-97b3-3da6409a7949)
