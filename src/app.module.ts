import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { LocalFileService } from './models/file_management/local-file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalFile } from './models/file_management/local-file.entity';
import { User } from './models/users/users.entity';
import { ItemsModule } from './models/items/items.module';
import { QueryModule } from './models/query/query.module';
import { UploadFileModule } from './models/file_management/upload-file.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`
    }),
    DatabaseModule,
    MailModule,
    ItemsModule,
    QueryModule,
    UploadFileModule
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
