import { Controller } from '@nestjs/common';
import { Body, Get, Post, Res, Req, Delete } from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { CreateUser } from './dto/create.user.dto';
import { LoginUser } from './dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';


@Controller()
export class UserController {
    constructor(
        private userService:UserService,
        private readonly jwtService:JwtService
        ){}

    
    @Post("register") //register user
    async create(@Body() createUserDto : CreateUser){
        return this.userService.register(createUserDto);
    }

    @Post("login") //login user
    async login(
        @Body() loginUser : LoginUser,
        @Res({passthrough:true}) response:Response
        ): Promise<string>{
        const jwt = await this.userService.login(loginUser); 
        response.cookie("jwt", jwt, {httpOnly:true}); //save jwt in cookies
        return "jwt succes";
    }

    @Get("getUser")
    async getUser(
        @Req() request:Request,
        @Body("id") id :number
        ): Promise<any>{
        try{
            const jwt : any = this.jwtService.decode(request.cookies["jwt"]) //decoding jwt token
            if(id && jwt.role){
                return await this.userService.getUserById(id) //get user from admin
            }else if(jwt.id){
                return await this.userService.getUserById(jwt.id) // get user
            }else{
                return "not found user";
            }
        }
        catch(e){
            return "user is logouted";
        }
    }

    @Delete("deleteUser")
    async delete(
        @Req() request : Request,
        @Res({passthrough : true}) response : Response,
        @Body("id") id : number 
    ) : Promise<any>{
        try{
            let jwt : any = this.jwtService.decode(request.cookies["jwt"])
            if(id && jwt.role){
                await this.userService.delete(id); 
                return "deleted by admin"
            }else if(id && jwt.id !== id){
                return "user cannot delete other users" 
            }else if(jwt.id){
                await this.userService.delete(jwt.id); //if this jwt.id same whith user.id user is removing
                response.clearCookie('jwt');
                return "deleted by user"
            }else{
                return "not Found for Delete"
            }
        }catch(e){
            console.log(e);
        }
    }

    @Post("logout")
    async logout(
        @Res({passthrough : true}) response : Response,
    ){
        response.clearCookie("jwt"); // jwt was removing
        return "user was logouted"
    }
}
