import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalFileService } from './models/file_management/local-file.service';
import UploadFilesInterceptor from './models/file_management/upload-file.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly fileService: LocalFileService) {}

  @Get()
  getHello(): Promise<any> {
    return this.appService.getHello();
  }

  @Get('/file/:id')
  getFile(@Param('id') id: number) {
    return this.fileService.getFile(id);
  }

  @Post('upload-file')
  @UseInterceptors(UploadFilesInterceptor({
    fieldName: 'file3',
    path: '/test_new'
  }))
  async uploadFile(@Req() request: Request, @UploadedFile() file: Express.Multer.File) {
    return this.appService.uploadFile(file)
  }

  @Post('file')
  async file(@Body() files: localFileInterface) {
    return this.fileService.saveMetadataFile(files)
  }
}
