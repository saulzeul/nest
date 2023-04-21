## Description

Intranet version 3.0

### Before use in Windows try
```powershell
npm install -g win-node-env
```

## Installation

```powershell
npm install
```

## Running the app

```powershell
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```


### Generate and runing Compodoc
```powershell
# Runing in localhost:8080
npx @compodoc/compodoc -p tsconfig.json -s
```

## Migrations (TypeORM)

### Development environment
```powershell
# Run all migrations
npm run typeorm:run

# Generate a new migration
npm run typeorm:migration --NAME=migrationName

# Delete last upload migration
npm run typeorm:revert

```
> **⚠ WARNING**
> ```powershell
> # Drop all migrations from database
> npm run typeorm:drop
> ```


### Production environment
```powershell
# Run all migrations
npm run typeorm-prod:run
```

## Handling entities (TypeORM)
    .
    ├── src
    |   |── models
    |       |── [name-model]              #model with entity migrations
    |       |   |── [name].entity.ts
    |       |── [name-model]              #model with exclude of migrations
    |       |    |── exclude-entity
    |       |       |── [name].exclude.entity.ts
    |       └── ...
    └── ...

## Connect to database (TypeORM)
