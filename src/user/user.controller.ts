import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto, UserDtoExt } from "./user.dto";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { RoleGuard } from "src/auth/guard/role.guard";
import { UserEntity } from "./user.entity";

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService) { }

    @Post('/create')
    async register(@Body() user:UserDto):Promise<any>{
        return await this.userService.register(user)
    }

    @Post('/login')
    async login(@Body() user:UserDtoExt):Promise<any> {
        return await this.userService.login(user)
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Get('/find/all')
    async findAllUser():Promise<UserEntity[]> {
        return await this.userService.findAll()
    }
}