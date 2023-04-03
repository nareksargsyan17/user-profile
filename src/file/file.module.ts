import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { File } from './entity/File';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports : [
    TypeOrmModule.forFeature([File])
  ],
  providers: [FileService],
  controllers: [FileController],
  exports : [TypeOrmModule, FileService] 
})
export class FileModule {}
