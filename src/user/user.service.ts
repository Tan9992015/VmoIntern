import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UserAllOptional, UserDto, UserDtoExt } from "./user.dto";
import { retry } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { error } from "console";
import { Role } from "src/enum/role.enum";
const bcrypt = require('bcrypt');
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
                private readonly userRepository:Repository<UserEntity>,
                private readonly authService:AuthService
    ) { }

    // Authentication
    async comparePassword(password:string,hashedPassword:string): Promise<boolean> {
        return await bcrypt.compare(password,hashedPassword)
    
    }

    async hashPassword(password:string):Promise<string> {
        return await bcrypt.hash(password,10)
    }

    async register(user:UserDto):Promise<any> {
        try {
            console.log(user)
            let newUser = new UserEntity()
            newUser.phoneNumber = user.phoneNumber ?? ''
            newUser.email = user.email ?? ''
            newUser.name = user.name ?? ''
            newUser.address = user.address ?? ''
            newUser.password = await this.hashPassword(user.password) ?? ''
            
            // save user to db
            const savedUser = await this.userRepository.save(newUser)

            // get accesstoken and refresh token
            const payload = {
                "name":newUser.name,
                "email":newUser.email,
                "phoneNumber":newUser.phoneNumber
            }
            const token = await this.authService.genarateToken(payload)
            const refreshToken = token.refreshToken
            const accessToken = token.accessToken
            return {
                mess:'register success',
                accessToken:accessToken,
                refreshToken: refreshToken
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async login(user:UserDtoExt):Promise<any> {
        try {
            const foundUser = await this.userRepository.findOne({where:{email:user.email}})
            if(!foundUser) return {err:1, mess: "user email is not correct"}
        
            if(!this.comparePassword(user.password,foundUser.password)) return {err: 1, mess: "password is not correct"}

            const payload = {
                "role":foundUser.role,
                "name":foundUser.name,
                "email":foundUser.email,
                "phoneNumber":foundUser.phoneNumber
            }

            const token = await this.authService.genarateToken(payload)

            return {
                err:0,
                mess:"login successfully",
                accessToken:token.accessToken,
                refreshToken:token.refreshToken
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    //CRUD
    async findAll():Promise<UserEntity[]> {
        return await this.userRepository.find()
    }
    
    async updateOneByEmal(email:string,user:UserAllOptional):Promise<any> {
       try {
        const foundUser = await this.userRepository.findOne({where:{email}})
        if(!foundUser) return {
            err:1,
            mess:'user email not found'
        }
        const updatedUser = await this.userRepository.update(foundUser.id, user)
        if(!updatedUser) return {
            err:1,
            mess:'updated fail'
        }

        return {
            error:0,
            mess:'updated success'
        }
       } catch (error) {
            throw new Error(error)
       }
        
    }

     async updateOneById(id:string,user:UserAllOptional):Promise<any> {
       try {
        const foundUser = await this.userRepository.findOne({where:{id}})
        if(!foundUser) return {
            err:1,
            mess:'user email not found'
        }
        const updatedUser = await this.userRepository.update(foundUser.id, user)
        if(!updatedUser) return {
            err:1,
            mess:'updated fail'
        }

        return {
            err:0,
            mess:'updated success'
        }
       } catch (error) {
            throw new Error(error)
       }
        
    }

    async softDelete(id:string):Promise<any> {
        return await this.userRepository.softDelete(id)
    }

    async findOneByEmai(email:string):Promise<any> {
        return await this.userRepository.findOne({where:{email}})
    }

    async findOneById(id:string):Promise<any> {
        return await this.userRepository.findOne({where:{id}})
    }
}