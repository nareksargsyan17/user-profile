import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Put, Req, Res, Body } from '@nestjs/common/decorators';
import { Request } from 'express';
import { EditProfile } from './dto/edit.profile.dto';
import { JwtService } from '@nestjs/jwt';
@Controller()
export class ProfileController {
    constructor(
        private profileService : ProfileService,
        private jwtService : JwtService
        ){}

    @Put("edit") //editing profile rows
    async update(@Req() request : Request,@Body() editDto : EditProfile){
        const jwt : any = this.jwtService.decode(request.cookies["jwt"]) //jwt token decoding
        if(jwt.role){
            await this.profileService.update(editDto.userId, editDto)
            return "updated by admin";
        }else if(jwt && jwt.id && !editDto.userId){
            await this.profileService.update(jwt.id, editDto)
            return "updated by user"
        }else{
            return "not Found"
        }
    }
}

