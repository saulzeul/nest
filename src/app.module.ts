import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './models/items/items.module';
import { QueryModule, UploadFileModule, MailModule} from './models/index';

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
  providers: [AppService],
})
export class AppModule {}
