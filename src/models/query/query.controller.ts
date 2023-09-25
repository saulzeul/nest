import { Controller, Get } from '@nestjs/common';
import { QueryService } from './query.service';
import { User } from '../users/exclude-entity/users.exclude-entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('query')
@ApiTags('Query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Get('/query-repostory')
  getQueryRepository(): Promise<any> {
    return this.queryService.queryRepository()
  }

  @Get('/query-repository-excluded')
  getQueryRepositoryExcluded(): Promise<User[]> {
    return this.queryService.queryRepositoryExcluded()
  }

  @Get('/query-builder-excluded')
  getQueryBuilder(): Promise<any> {
    return this.queryService.queryBuilderExcluded()
  }

}
