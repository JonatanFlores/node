# Server

## Test

> DON'T FORGET TO CREATE TESTS

Running the tests

```bash
$ npm test
```

### DATABASE COMMANDS:

Migrating DB

```bash
npx cross-env NODE_ENV=production DB_NAME=your-db-name knex migrate:latest --knexfile knexfile
```

Rollback DB

```bash
npx cross-env NODE_ENV=production DB_NAME=your-db-name knex migrate:rollback --knexfile knexfile
```

Generating Migration File

```bash
npx knex migrate:make your_migration_name
```

### Setting Up Production Server

Installing the nvm to use setup the node installation

```bash
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
```

List all node versions and choose the last `LTS version`

```bash
$ nvm ls-remote
```

Install Node and NMP using the following command:

```bash
$ nvm install v10.16.3
```

Installing the global package for running node applications on background

```bash
$ npm i -g pm2
```

### Setting Up Apache for Reverse Proxy (CENTOS 7)

First of all you need to enable the following apache modules `proxy`, `http_proxy` and then restart the apache service

and then it's necessary to create a file, `api.my-domain.conf` or whatever name you want at the folder `/etc/httpd/conf.d` using the following configuration and then restart the apache service

```xml
<VirtualHost *:80>
    ProxyPass / http://localhost:8080/
    ServerName api.my-domain.com.br
</VirtualHost>
```

### Production Server COMMANDS:

**Start**, **stop**, **restart** and **delete** application `running` on the server, can be done by executing one of the following commands

```bash
$ npm run prod:start
$ npm run prod:stop
$ npm run prod:restart
$ npm run prod:delete
```
