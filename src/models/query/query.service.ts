import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { env_secondary_db } from '../../constants/database.const';
import { DataSource, Repository } from 'typeorm';
import { User as UserNotExcluded } from '../users/users.entity';
import { User } from '../users/exclude-entity/users.exclude-entity'

@Injectable()
export class QueryService {
    constructor(
        @InjectDataSource(env_secondary_db.name)
        private connection: DataSource,
        @InjectRepository(UserNotExcluded)
        private userRepository: Repository<UserNotExcluded>,
      ) {}
    async queryRepository(): Promise<any> {
        const users = await this.userRepository.find();
        //const query = await this.userRepository.query('SELECT * FROM users');
        return users
      }
    
      async queryBuilderExcluded(): Promise<any> {
        const query = await this.connection.query('SELECT * FROM users');
        return query
      }
    
      async queryRepositoryExcluded(): Promise<User[]> {
        const users = await this.connection.getRepository(User).find({
          where: {
            status: true
          }
        })
        return users
      }
}
