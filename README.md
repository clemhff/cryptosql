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
 ```node -v```

## install npm dependencies  
```npm install```

## env variable
```mkdir env
cd env
touch dbId.js
nano dbId.js
```

Insert connection variables

```
exports.connId = {
  user: 'user',
  host: '127.0.0.1',
  database: 'database_name',
  password: 'password',
  port: 1234
}
```
## PM2 to automate start  

```
sudo npm install pm2@latest -g
touch start.sh
nano start.sh
```

Insert  
```
#!/bin/bash
cd /path/to/project
npm start  

```
```
pm2 start start.sh --name cryptosql --exp-backoff-restart-delay=100 --watch
pm2 save```
