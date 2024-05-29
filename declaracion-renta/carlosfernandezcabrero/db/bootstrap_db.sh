cd ./sql

PGPASSWORD=admin psql -U admin -h localhost -d main < CREATE.sql
PGPASSWORD=admin psql -U admin -h localhost -d main < INSERTS.sql
PGPASSWORD=admin psql -U admin -h localhost -d main < FUNCTIONS.sql
PGPASSWORD=admin psql -U admin -h localhost -d main < PROCEDURES.sql
PGPASSWORD=admin psql -U admin -h localhost -d main < TRIGGERS.sql
