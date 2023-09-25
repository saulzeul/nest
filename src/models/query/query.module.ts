import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User]),],
  controllers: [QueryController],
  providers: [QueryService]
})
export class QueryModule {}
