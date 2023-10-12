import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LocalFile, localFileInterface, } from './index';

@Injectable()
export class LocalFileService {
    constructor(
        @InjectRepository(LocalFile)
        private localFileRepository: Repository<LocalFile>
    ) {}

    async saveMetadataFile(metadata: localFileInterface, module: string) {
        const { filename, destination, path, mimetype } = metadata;
        const newFile = await this.localFileRepository.save({
            fieldname: module,
            filename,
            destination,
            path,
            mimetype
        });
        return newFile
    }

    async getFile(id: number) {
        const metadataFileExists = await this.localFileRepository.findOne({
            where: {
                id: id
            }
        });
        if (!metadataFileExists) throw new NotFoundException();
        return metadataFileExists
    }

    async removeFile(id: number) {
        const fs = require('fs');
        const file = await this.getFile(id);
        fs.unlink(file.path, (error) => {
            if (error) return console.log(error);
            this.deleteFileFromDb(id)
        })
    }

    private async deleteFileFromDb(id: number) {
        return await this.localFileRepository.delete(id);
    }

}