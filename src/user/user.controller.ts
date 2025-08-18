import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserAllOptional, UserDto, UserDtoExt } from "./user.dto"
import { JwtGuard } from "src/auth/guard/jwt.guard"
import { RoleGuard } from "src/auth/guard/role.guard"
import { UserEntity } from "./user.entity"
import { LoggingInterceptor } from "src/logging/logging.interceptor"
import { LoggingDecorator } from "src/logging/logging.decorator"
import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"
import {v4 as uuidv4} from 'uuid'
import * as path from "path"
import { Role } from "src/enum/role.enum"
import { join } from "path"
import { ApiTags } from "@nestjs/swagger"


@ApiTags('user')
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

    @UseGuards(JwtGuard,RoleGuard)
    @Put('/role-update/:id')
    async updateRole(@Param('id') id: string, @Body('role') role: Role):Promise<any> {
        return await this.userService.updateOneById(id, { role })
    }

    @Put('update')
    async updateUserByEmail( email:string,user:UserAllOptional) {
        return await this.userService.updateOneByEmal(email,user)
    }

    @Delete('/delete/:id')
    async deleteUserById(@Param('id') id:string ):Promise<any> {
        return await this.userService.softDelete(id)
    }
    // avatar

    @UseGuards(JwtGuard)
    @UseInterceptors(FileInterceptor('file', {
      storage:diskStorage({
        destination:'./uploads/profileImage',
        filename(req, file, cb) {
            try {
                const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
                const extension = path.parse(file.originalname).ext
                console.log('path parse file ',path.parse(file.originalname))
                console.log('file original name',file.originalname)
                return cb(null,`${filename}${extension}`)
            } catch (error) {
                cb(error,'')
            }
        },
      })  
    }))
    @Put('upload')
    async uploadFile(@UploadedFile() file,@Req() req):Promise<any> {
        console.log('file after process',file)
        const user = req.user
        console.log(user)
        return await this.userService.updateOneByEmal(user.email,{avatar:file.filename})
    }

    // process.cwd() = D:\vmo\vmo-intern
    @Get('profile-image/:imagename')
    findProfileImage(@Param('imagename') imagename,@Res() res):Promise<Object> {
      return res.sendFile(join(process.cwd(),'uploads/profileimage/'+imagename))
    }
}