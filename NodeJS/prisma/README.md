### Run postgres locally

docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

### Migrate prisma

npx prisma migrate dev --name migration_name

### Update prisma-client

npx prisma generate

### Connect to postgress inside container

psql -U postgres

### show all databases

\l
