# cryptosql
Put crypto data in postgres

## Dependencies 

### PostgreSql needs to be installed and database with a user must be present for connection
```sudo -u postgres psql
CREATE ROLE userName WITH SUPERUSER CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD 'mypassword';
CREATE DATABASE name
```

### NodeJS needs to be installed
To verify : 
\n ```node -v```

## install npm dependencies 
\n```npm install```

## env variable
```mkdir env
cd env
touch dbId.js
nano dbId.js
```

Insert connection variables

```exports.connId = {
  user: 'user',
  host: '127.0.0.1',
  database: 'database_name',
  password: 'password',
  port: 1234
}
```
