import { HttpException, HttpStatus } from "@nestjs/common"
import { existsSync, mkdirSync } from "fs"
import { diskStorage } from "multer"
import { extname } from "path"
import { api_config } from "src/constants/api.config.const"
import { v4 as uuid } from 'uuid'


interface multerOptions {
    destination: string
    max_size: number
    type_file: string
}

export const multerConfig = (options: multerOptions) => {
    return {
        limits: {
            fileSize: options.max_size
        },
        fileFilter: (req: any, file: any, cb: any) => {
            if (file.mimetype.startsWith(options.type_file)) {
                cb(null, true);
            } else {
                cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
            }
        },
        storage: diskStorage({
            destination: (req: any, file: any, cb: any) => {
                const uploadPath = `.${api_config.storage}${options.destination}`;
                if (!existsSync(uploadPath)) {
                    mkdirSync(uploadPath);
                }
                cb(null, uploadPath)
            },
            filename: (req: any, file: any, cb: any) => {
                cb(null, `${uuid()}${extname(file.originalname)}`)
            }
        })
    }
}