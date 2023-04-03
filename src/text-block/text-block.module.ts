import { Module } from '@nestjs/common';
import { TextBlockController } from './text-block.controller';
import { TextBlockService } from './text-block.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TextBlock } from './entity/TextBlock';
import { FileModule } from 'src/file/file.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [TypeOrmModule.forFeature([TextBlock]),FileModule, JwtModule],
  controllers: [TextBlockController],
  providers: [TextBlockService],
  exports: [TypeOrmModule]
})
export class TextBlockModule {}
