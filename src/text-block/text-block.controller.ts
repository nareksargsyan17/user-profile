import { Body, Controller, Delete, Get, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TextBlockService } from './text-block.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { FileService } from 'src/file/file.service';
import { TextBlockDto } from './dto/text.block.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class TextBlockController {
    constructor(
        private textBlockService : TextBlockService,
        private fileService : FileService,
        private jwtService : JwtService
        ){}
        @Post('addTextBlock') // creating textBlock
        @UseInterceptors(FileInterceptor("image",
                {
                    storage: diskStorage({
                        destination: './public/images/', //creating file in local folder
                        filename: (req, image, cb) => {
                            const filename: string = path.parse(image.originalname).name.replace(/\s/g, '') + uuidv4();//originalName+randomwords
                            const extension: string = path.parse(image.originalname).ext;
            
                            cb(null, `${filename}${extension}`)
                        }
                    })
                
                }
            ))
            //creating textBlock
            async createTextBlock(
                @UploadedFile() image : Express.Multer.File,
                @Body() textBlock : TextBlockDto,
                @Req() request : Request,
                ) {
                    const jwt : any = this.jwtService.decode(request.cookies["jwt"])
                    if(jwt.role){
                        const id = await  this.textBlockService.createText(textBlock)
                        return await this.fileService.create({src : image.path, essenceId : id, essenceTable : `profile`})
                    }else{ 
                        return "only Admin can create"
                    }           
            }
            //deleting textBlock and his file
        @Delete("removeTextBlock")
        async delete(
            @Body("id") id : number,
            @Req() request : Request
        ){
            const jwt : any = this.jwtService.decode(request.cookies["jwt"])
            if(jwt.role){
                return await this.textBlockService.deleteText(id)
            }else{ 
                return "only Admin can delete"
            } 
        }
        //updateding text block
        @Put("updateTextBlock")
        async update(
            @Body() textBlockDto : TextBlockDto,
            @Req() request : Request
        ){
            const jwt : any = this.jwtService.decode(request.cookies["jwt"])
            if(jwt.role){
                return await this.textBlockService.update(textBlockDto.id, textBlockDto)
            }else{ 
                return "only Admin can update"
            } 
        }

        //for All textBlocks
        @Get("getAllTextBlocks")
        async allTextBlocks(
            @Req() request : Request
        ){
            const jwt : any = this.jwtService.decode(request.cookies["jwt"])
            if(jwt.role){
                return await this.textBlockService.getAll()
            }else{ 
                return "only Admin can view"
            } 
        }

        //for one TextBlock
        @Get("getOneTextBlock")
        async oneTextBlock(
            @Body("id") id : number,
            @Req() request : Request
        ){
            const jwt : any = this.jwtService.decode(request.cookies["jwt"])
            if(jwt.role){
                return await this.textBlockService.getOne(id)
            }else{ 
                return "only Admin can view"
            } 
        }

        //filter TextBlock
        @Get("getbyGroup")
        async filter(
            @Body("group") group :string,
            @Req() request : Request
        ){
            const jwt : any = this.jwtService.decode(request.cookies["jwt"])
            if(jwt.role){
                return await this.textBlockService.filterbyGroup(group)
            }else{ 
                return "only Admin can filter"
            } 
        }
}
