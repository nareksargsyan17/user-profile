import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entity/Film';
import { Repository } from 'typeorm';
import { FilmDto } from './dto/film.dto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class FilmService {
    constructor(
        @InjectRepository(Film)
        private filmRepository : Repository<Film>,
        private fileService : FileService

    ){}
    //creating film in database
    async createFilm(film : FilmDto){
        return (await this.filmRepository.save(film)).id
    }
    async deleteFilm(id : number){
        await this.filmRepository.delete(id);
        await this.fileService.deletedFile(id)
    }
}
