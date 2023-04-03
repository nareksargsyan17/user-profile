import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, LessThan, Repository } from 'typeorm';
import {File} from "./entity/File"
import * as fs from "fs"
@Injectable()
export class FileService {
    constructor(@InjectRepository(File)
    private fileRepository : Repository<File>,
    ){}

    //uploadind files in local file
    async insert(src : any){
        const images = src.map(el => {
            return { src: el.path}
        })
        return await this.fileRepository.insert(images);
    }

    //saving file in database
    async create(img : any){
        return await this.fileRepository.save(img);
    }

    //updateing files essenceId and essenceTable
    async update(images : Array<number>,id:number){
        this.fileRepository.update(
            {
              id: In(images),
            },
            { "essenceId": id, "essenceTable" : "film" },
          );
    }

    //deleteing unused Files
    async delete(){
        const cutoffDate = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
        const unusedFiles = await this.fileRepository.find({
            where: {
                createdAt: LessThan(cutoffDate),
                essenceId : IsNull(),
                essenceTable : IsNull()
            },
    });
    //deleting local files
    for (const file of unusedFiles) {
      fs.unlinkSync(file.src);
    }
      return await this.fileRepository.remove(unusedFiles);
    }

    //delete while textBlock Or Film deleted
    async deletedFile(id : number){
        const deletedFile = await this.fileRepository.find({
            where: {
              essenceId : id,
            },
          });
          for (const file of deletedFile) {
            fs.unlinkSync(file.src);
          }
            return await this.fileRepository.remove(deletedFile);
          }
}
