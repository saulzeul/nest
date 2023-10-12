import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { env_secondary_db } from './constants/database.const';
import { LocalFileService } from './models/file_management/local-file.service';
import { User } from './models/users/exclude-entity/users.exclude-entity';
import { User as UserNotExcluded } from './models/users/users.entity';

@Injectable()
export class AppService {
  constructor(
  ) {}
  async getHello(): Promise<any> {
/*     const query = await this.connection.query('SELECT * FROM users'); */

/*     const params:mailParams = {
      to: ['saul.espinoza@martinrea.com'],
      cc: [],
      context: {},
      template: 'test',
      subject: 'Prueba'
    }
    await this.mailService.sendMail(params) */
    return true;
  }
}
