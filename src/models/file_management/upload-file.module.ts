import { Module} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { api_config } from '../../constants/api.config.const';
import { LocalFileService } from './local-file.service';
import { LocalFilesController } from './local-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalFile } from './local-file.entity';

@Module({
    imports: [
/*         ConfigModule.forRoot({
            validationSchema: Joi.object({
                [api_config.storage] : Joi.string().required()
            })
        }), */
        TypeOrmModule.forFeature([LocalFile])
    ],
    controllers: [ LocalFilesController ],
    providers: [ LocalFileService]
})
export class UploadFileModule {}