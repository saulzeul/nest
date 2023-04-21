import { Controller, Get, Param, ParseIntPipe, Res, StreamableFile } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { createReadStream } from "fs";
import { join } from "path";
import { LocalFileService } from "./local-file.service";

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
    
}