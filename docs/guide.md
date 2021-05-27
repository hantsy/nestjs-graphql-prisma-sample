

```
 npm i --save @nestjs/graphql apollo-server-express graphql-tools graphql
```


npm install prisma typescript ts-node @types/node --save-dev
 npx prisma init

✔ Your Prisma schema was created at prisma/schema.prisma.
  You can now open it in your favorite editor.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql or sqlite.
3. Run prisma db pull to turn your database schema into a Prisma data model.
4. Run prisma generate to install Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started





 npx prisma migrate dev --name init
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "blogdb", schema "public" at "localhost:5432"

PostgreSQL database blogdb created at localhost:5432

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20210524102219_init/
    └─ migration.sql

Your database is now in sync with your schema.

