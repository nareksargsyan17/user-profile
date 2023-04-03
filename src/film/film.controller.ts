import { Body, Controller, Delete, Post } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmDto } from './dto/film.dto';
import { FileService } from 'src/file/file.service';

@Controller()
export class FilmController {
    constructor(
        private filmService : FilmService,
        private fileService : FileService
        ){}
        @Post('addFilm') //creating film
        async createFilm(
            @Body() film : FilmDto
            ) {
            const id = await  this.filmService.createFilm({name:film.name,text:film.text})
            await this.fileService.update(film.images,id);
            return "succes"
        }

        @Delete("removeFilm") //deleting film
        async delete(
            @Body("id") id : number,
        ){
            return await this.filmService.deleteFilm(id)
        }

}
