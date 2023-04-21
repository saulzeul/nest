import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { env_secondary_db } from './constants/database.const';
import { LocalFileService } from './models/file_management/local-file.service';
import { MailService } from './mail/mail.service';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource(env_secondary_db.name)
    private connection: DataSource,
    private readonly mailService: MailService,
    private readonly localFileService: LocalFileService
  ) {}
  async getHello(): Promise<any> {
    const query = await this.connection.query('SELECT * FROM users');

/*     const params:mailParams = {
      to: ['saul.espinoza@martinrea.com'],
      cc: [],
      context: {},
      template: 'test',
      subject: 'Prueba'
    }
    await this.mailService.sendMail(params) */
    return query;
  }

  async uploadFile(file_data: localFileInterface) {
    await this.localFileService.saveMetadataFile(file_data)
  }
}
