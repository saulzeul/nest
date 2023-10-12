## Description

Intranet version 3.0

### Before use in Windows try

```powershell
npm install -g win-node-env
```

## Installation

```powershell
npm install

npm install -g @nestjs/cli
```

## Build

```powershell
  npm run build
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

### Generate new model

```powershell
nest g res models/<model name>
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
>
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

### In file ```.env``` and  ```.env.development``` add this

```powershell
    PRIMARY_DB_HOST=
    PRIMARY_DB_PORT=
    PRIMARY_DB_USER=
    PRIMARY_DB_PASSWORD=
    PRIMARY_DB_NAME=
```

### If you add two or more databse in the same connection add this

```powershell
    SECONDARY_DB_NAME=
```

#### If you add two or more connections add this

```powershell
    SECONDARY_DB_HOST=
    SECONDARY_DB_PORT=
    SECONDARY_DB_USER=
    SECONDARY_DB_PASSWORD=
    SECONDARY_DB_NAME=
```

#### modify the file <em> ./constants/databse.const.ts </em> for example

```typescript
export const env_secondary_db = {
    host: getEnv('SECONDARY_DB_HOST'),
    port: Number(getEnv('SECONDARY_DB_PORT')),
    user: getEnv('SECONDARY_DB_USER'),
    password: getEnv('SECONDARY_DB_PASSWORD'),
    db_name: getEnv('SECONDARY_DB_NAME')
}
```

#### copy and paste the file and rename <em> ./database/connections/secondary.db.ts </em>, modify the environment variables and import the connection module in <em> ./database/database.module.ts

## Connect another table in any service example

```typescript
//service.ts
@Injectable()
export class AppService {
  constructor(
    @InjectDataSource(env_secondary_db.name)
    private connection: DataSource,
  ) {}
  async getHello(): Promise<any> {
    const query = await this.connection.query('SELECT * FROM users');
    const queryRepository = await this.connection.getRepository(repoName).find()
    return query or queryRepository;
  }
}

// Database connection
```

## Handling with files

### Upload files

```typescript
    @Post('upload-file')
    @UseInterceptors(FileInterceptor('file', multerConfig({
      destination: '<env-folder/name-sub-folder>',
      max_size: MaxSizesInMbEnum.ONE
      type_file: MimetypesEnum.TEXT_PLAIN
    })))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
      return this._localFileService.saveMetadataFile(file, '<model-name ex: users>')
    }
```

### Stream file

#### Check the table on database the id

| id | filename | module | destination           | path        | mimetype   |
|----|----------|--------|-----------------------|-------------|------------|
| 1  | uuid.txt | users  | path-folder-storage   | full-path   | text/plain |

```typescript
    @Get(':id')
    async getFileById(@Param('id', ParseIntPipe) id: number, @Res({
        passthrough: true
    }) response: Response) {
        const file = await this._localFileService.getFile(id);
        const fileStream = createReadStream(join(process.cwd(), file.path));
        response.set({
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Content-Type': file.mimetype
        })

        return new StreamableFile(fileStream)
    }
```

### Remove file from storage and DB

#### Pass the file id

```typescript
    @Delete(':id')
    async removeFile(@Param('id', ParseIntPipe) id: number) {
      return this._localFileService.removeFile(id);
    }
```

## Email Module

### Send a email by service

```typescript
  this.mailService.newEmail({
    to: ['an email'],
    cc: [],
    context: {
      fo: 'fo',
      bar: 'bar'
      items: [
        { name: 'Saul', lastname: 'Espinoza'},
        { name: 'Rogelio', lastname: 'Jasso'}
      ]
    },
    template: 'test',
    subject: 'Title'
  })
```

### Send a calendar event by service

```typescript
  
  this.mailservice.newMeeting(
    {
      to: ['an email'],
      cc: [],
      context: {
        fo: 'fo',
        bar: 'bar'
        items: [
          { name: 'Saul', lastname: 'Espinoza'},
          { name: 'Rogelio', lastname: 'Jasso'}
        ]
      },
      template: 'test',
      subject: 'Title'
    },
    {
      location: 'location of meeting',
      summary: 'title',
      start: new Date(),
      end: new Date()
      organizer: {
        name,
        email
      },
      attendees: [
        { 
          name, 
          email
        }
      ]
    }
  )
```
