import { Body, Controller, Get, Post, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto, UserDtoExt } from "./user.dto";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { RoleGuard } from "src/auth/guard/role.guard";
import { UserEntity } from "./user.entity";
import { LoggingInterceptor } from "src/logging/logging.interceptor";
import { LoggingDecorator } from "src/logging/logging.decorator";

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
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Get('/find/all')
    async findAllUser():Promise<UserEntity[]> {
        return await this.userService.findAll()
    }
}