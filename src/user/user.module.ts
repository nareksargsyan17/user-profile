import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret : "secret",
      signOptions : {expiresIn : "1h"}
    }),
    ProfileModule
],
  controllers: [UserController],
  providers: [UserService],
  exports : [TypeOrmModule]
})
export class UserModule {}
