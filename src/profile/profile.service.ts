import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entity/Profile';
import { CreateProfile } from './dto/create.profile.dto';
import { EditProfile } from './dto/edit.profile.dto';

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(Profile) 
    private profileRepository: Repository<Profile>,
    ){}

    //creating profile
    async create(profile: CreateProfile){
        await this.profileRepository.save(profile);
    }

    //updating profile
    async update(id : number, editDto : EditProfile){
        console.log(id, editDto);
        return await this.profileRepository.update(id, editDto)
    }

    
}
