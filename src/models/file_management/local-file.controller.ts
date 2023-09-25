import { Controller, Delete, Get, Param, ParseIntPipe, Post, Req, Res, StreamableFile, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { createReadStream } from "fs";
import { join } from "path";
import { LocalFileService } from "./local-file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "./multer-options";
import { MaxSizesInMbEnum } from "./enums/max-sizes.enum";
import { MimetypesEnum } from "./enums/mimetypes.enum";

@Controller('local-files')
@ApiTags('Local Files')
export class LocalFilesController {
    constructor(
        private readonly _localFileService: LocalFileService
    ) {}

    @Get(':id')
    async getFileById(@Param('id', ParseIntPipe) id: number, @Res({
        passthrough: true
    }) response: Response) {
        const file = await this._localFileService.getFile(id);
        const fileStream = createReadStream(join(process.cwd(), file.path));
        response.set({
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Content-Type': file.mimetype
        })

        return new StreamableFile(fileStream)
    }

    @Post('up')
    @UseInterceptors(FileInterceptor('file', multerConfig({
      destination: '/intranet',
      max_size: MaxSizesInMbEnum.ONE,
      type_file: MimetypesEnum.TEXT_PLAIN
    })))
    async uploadFile2(@UploadedFile() file: Express.Multer.File) {
      return this._localFileService.saveMetadataFile(file, 'texto')
    }

    @Post('upimg')
    @UseInterceptors(FileInterceptor('file', multerConfig({
      destination: '/intranet',
      max_size: MaxSizesInMbEnum.HUNDRED,
      type_file: MimetypesEnum.IMAGE_PNG
    })))
    async uploadFile3(@UploadedFile() file: Express.Multer.File) {
      return this._localFileService.saveMetadataFile(file, 'system')
    }

    @Delete(':id')
    async removeFile(@Param('id', ParseIntPipe) id: number) {
      return this._localFileService.removeFile(id);
    }

    
}