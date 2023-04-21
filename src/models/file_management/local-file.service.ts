import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LocalFile } from "./local-file.entity";

@Injectable()
export class LocalFileService {
    constructor(
        @InjectRepository(LocalFile)
        private localFileRepository: Repository<LocalFile>
    ) {}

    async saveMetadataFile(metadata: localFileInterface) {
        console.log(metadata)
        const newFile = await this.localFileRepository.save(metadata);
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
}