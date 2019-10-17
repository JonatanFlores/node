# Server

### DATABASE COMMANDS:

```bash

```

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
