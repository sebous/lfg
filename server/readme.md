## Dokku commands

- `dokku ps:restart appname` - restart app container
- `dokku enter appname containername command` - enter app container (for alpine container use sh not /bin/bash)
- `dokku logs appname [-t=tail]` - view app logs
- `docker exec dbContainerId su - postgres -c "dropdb dbname"` - drop database (TODO: add script for clearing db)
- `docker exec dbContainerId su - postgres -c "createdb -E utf8 dbaname"` - create database again
