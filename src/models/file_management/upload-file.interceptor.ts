import { Injectable, NestInterceptor, Type } from "@nestjs/common";
import { mixin } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import { api_config } from "../../constants/api.config.const";

interface UploadFilesInterceptorOptions {
    fieldName: string;
    path?: string;
}

function UploadFilesInterceptor( options: UploadFilesInterceptorOptions): Type<NestInterceptor> {
    @Injectable()
    class Interceptor implements NestInterceptor {
        fileInterceptor: NestInterceptor;
        constructor() {
            const destination = `${api_config.storage}${options.path}`

            const multerOptions: MulterOptions = {
                storage: diskStorage({
                    destination
                })
            }
            this.fileInterceptor = new (FileInterceptor(options.fieldName, multerOptions))
        }
        intercept(...args: Parameters<NestInterceptor['intercept']>) {
            return this.fileInterceptor.intercept(...args);
        }
    }

    return mixin(Interceptor);
}

export default UploadFilesInterceptor;