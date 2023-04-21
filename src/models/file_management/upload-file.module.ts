import { Module} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { api_config } from '../../constants/api.config.const';
import { LocalFileService } from './local-file.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                [api_config.storage] : Joi.string().required()
            })
        }),
    ],
    providers: [ LocalFileService]
})
export class UploadFileModule {}