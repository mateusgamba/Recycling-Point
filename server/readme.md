# Node Sequelize

## Run docker container

```
docker-compose exec server sh
```

## Run migration

```
npx sequelize db:migrate
```

## Run rollback migration

```
npx sequelize-cli db:migrate:undo:all
```

## Run seeder

```
npx sequelize db:seed:all
```

# Run migration

npx sequelize-cli db:migrate --url 'postgres://dbuser:dbpass@db:5432/dbname'


sequelize --config=sequelize-config.js db:seed:all

run sequelize db:migrate --env development