import { Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalFile, LocalFileService } from './index';
import { LocalFilesController } from './local-file.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([LocalFile])
    ],
    controllers: [ LocalFilesController ],
    providers: [ LocalFileService]
})
export class UploadFileModule {}