import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalFileService } from './models/file_management/local-file.service';
import UploadFilesInterceptor from './models/file_management/upload-file.interceptor';

@Controller()
export class AppController {

}
