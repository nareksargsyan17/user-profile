import { Controller, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {  Delete, Post, UploadedFiles } from '@nestjs/common/decorators';
import { FileService } from './file.service';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';


@Controller()
export class FileController {
    constructor(private fileService :FileService){}
    @Post('upload')//uploaded file before save
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'images', maxCount: 5 }],
            {
                storage: diskStorage({
                    destination: './public/images/',
                    filename: (req, image, cb) => {
                        const filename: string = path.parse(image.originalname).name.replace(/\s/g, '') + uuidv4();
                        const extension: string = path.parse(image.originalname).ext;
        
                        cb(null, `${filename}${extension}`)
                    }
                })
            
            }
        ))
        async uploadFile(@UploadedFiles() files: { images?: Express.Multer.File[]}) {
            return await this.fileService.insert(files.images)
        }
    @Delete("/deleteOdd")//deleted filew where createdAt ago 1 hour and essenceIdm, essenceTable is Null
    async delete(){
        return this.fileService.delete()
    }

}
