import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entity/User';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entity/Profile';
import { FileModule } from './file/file.module';
import { File } from './file/entity/File';
import { TextBlock } from './text-block/entity/TextBlock';
import { TextBlockModule } from './text-block/text-block.module';
import { FilmModule } from './film/film.module';
import { Film } from './film/entity/Film';
import appconfig from './appconfig';
@Module({
  imports: [
  ConfigModule.forRoot({
    load : [appconfig],
    isGlobal:true,
  }), 
  TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port:parseInt(process.env.DATABASE_PORT),
      username: "postgres",
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: false,
      entities: [User,Profile, File, TextBlock, Film],
      migrations: [],
      subscribers: [],
  }),
    UserModule,
    ProfileModule,
    FileModule,
    TextBlockModule,
    FilmModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
