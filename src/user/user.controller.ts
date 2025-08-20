import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common"
import { UserService } from "./user.service"
import { UpdateRoleDto, UserAllOptional, UserDto, UserDtoExt } from "./user.dto"
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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from "@nestjs/swagger"


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


    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard,RoleGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Get('/find/all')
    async findAllUser():Promise<UserEntity[]> {
        return await this.userService.findAll()
    }


    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard,RoleGuard)
    @ApiParam({name:'id',description:'User ID',type:String})
    @ApiBody({type:UpdateRoleDto})
    @Put('/role-update/:id')
    async updateRole(@Param('id') id: string, @Body('role') role: Role):Promise<any> {
        return await this.userService.updateOneById(id, { role })
    }


    @ApiBearerAuth('access-token')
    @ApiBody({type:UserAllOptional})
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Put('update')
    async updateUserById(@Req() req,@Body()user:UserAllOptional):Promise<any> {
        return await this.userService.updateOneById(req.user.id,user)
    }

    @ApiBearerAuth('access-token')
    @ApiParam({name:'id',description:'user id need to delete',type:String})
    @UseGuards(JwtGuard,RoleGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Delete('/delete/:id')
    async deleteUserById(@Param('id') id:string ):Promise<any> {
        return await this.userService.softDelete(id)
    }
    // avatar
    @ApiBearerAuth('access-token')
    @ApiConsumes('multipart/form-data') // báo swagger endpoint dùng multipart 
    @ApiBody({
        schema:{
            type:'object',
            properties: {
                file:{ type:'string', format:'binary'},
            },
            required:['file']
        }
    })
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(
    FileInterceptor('file', {
      storage:diskStorage({
        destination:'./uploads/profileImage',
        filename(req, file, cb) {
            try {
                console.log('file original name',file.originalname)
                console.log('path pars', path.parse(file.originalname))
                const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
                const extension = path.parse(file.originalname).ext
                return cb(null,`${filename}${extension}`)
            } catch (error) {
                cb(error,'')
            }
        }
      })  
    }
),
    LoggingInterceptor
)
    @Put('upload')
    async uploadFile(@UploadedFile() file,@Req() req):Promise<any> {
        const id = req.user.id
        return await this.userService.updateOneById(id,{avatar:file.filename})
    }

    // process.cwd() = D:\vmo\vmo-intern
    @Get('profile-image/:imageName')
    @ApiParam({name:'imageName',description:'image from db',type:String})
    findProfileImage(@Param('imageName') imagename,@Res() res):Promise<Object> {
      return res.sendFile(join(process.cwd(),'uploads/profileimage/'+imagename))
    }
}