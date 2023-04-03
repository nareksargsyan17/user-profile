import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entity/Film';
import { FileModule } from 'src/file/file.module';

@Module({
  imports : [TypeOrmModule.forFeature([Film]), FileModule],
  controllers: [FilmController],
  providers: [FilmService],
  exports : [TypeOrmModule]
})
export class FilmModule {}
