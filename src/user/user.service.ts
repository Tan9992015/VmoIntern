import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UserDto, UserDtoExt } from "./user.dto";
import { retry } from "rxjs";
import { AuthService } from "src/auth/auth.service";
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
            if(!foundUser) return {mess: "user email is not correct"}
        
            if(!this.comparePassword(user.password,foundUser.password)) return {mess: "password is not correct"}

            const payload = {
                "role":foundUser.role,
                "name":foundUser.name,
                "email":foundUser.email,
                "phoneNumber":foundUser.phoneNumber
            }

            const token = await this.authService.genarateToken(payload)

            return {
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
}