import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TextBlock } from './entity/TextBlock';
import { InjectRepository } from '@nestjs/typeorm';
import { TextBlockDto } from './dto/text.block.dto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class TextBlockService {
    constructor(
        @InjectRepository(TextBlock)
        private textRepository : Repository<TextBlock>,
        private fileService : FileService
    ){}
    async createText(textBlock : TextBlockDto){
        return (await this.textRepository.save(textBlock)).id
    }

    async deleteText(id : number){
        await this.textRepository.delete(id);
        await this.fileService.deletedFile(id)
    }
    async update(id:number,textBlockDto : TextBlockDto){
        return await this.textRepository.update(id, textBlockDto)
    }
    async getAll(){
        return await this.textRepository.find()
    }
    async getOne(id: number){
        return await this.textRepository.findOneBy({id : id})
    }

    async filterbyGroup(group : string){
        return await this.textRepository.findBy({group : group})
    }
}
