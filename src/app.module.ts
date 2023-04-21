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

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`
    }),
    DatabaseModule,
    MailModule,
    TypeOrmModule.forFeature([LocalFile])
  ],
  controllers: [AppController],
  providers: [AppService, MailService, LocalFileService],
})
export class AppModule {}
