import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common"
import { ProductService } from "./product.service"
import { ProductAllOptional, ProductDto } from "./product.dto"
import { ProductEntity } from "./product.entity"
import { Pagination } from "nestjs-typeorm-paginate"
import { JwtGuard } from "src/auth/guard/jwt.guard"
import { RoleGuard } from "src/auth/guard/role.guard"
import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"
import {v4 as uuidv4} from 'uuid'
import * as path from "path"
import { join } from "path"
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger"
import { LoggingDecorator } from "src/logging/logging.decorator"
import { LoggingInterceptor } from "src/logging/logging.interceptor"


@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService) { }

    @ApiBearerAuth('access-token')
    @ApiBody({type:ProductDto})
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Post('/create')
    async createProduct(@Body() product:ProductDto):Promise<any> {
        return await this.productService.create(product)
    }


    @ApiBearerAuth('access-token')
    @ApiBody({type:ProductAllOptional})
    @ApiParam({name:'id',description:'Product ID',type:String})
    @UseGuards(JwtGuard)
    @Put('update/:id')
    async updateProduct(@Param('id') id:string, @Body() product:ProductAllOptional):Promise<any> {
        return await this.productService.updateProductById(id,product)
    }


    @ApiBearerAuth('access-token')
    @ApiParam({name:'id',description:'Product ID',type:String})
    @UseGuards(JwtGuard,RoleGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Delete('delete/:id')
    async deleteProduct(@Param('id') id:string):Promise<any> {
        return await this.productService.deleteProduct(id)
    }


    @ApiParam({name:'id',description:'Product ID',type:String})
    @Get('find/:id')
    async getProductById(@Param('id') id:string):Promise<ProductEntity> {
        return await this.productService.findOneById(id)
    }

    @Get('all')
    async findAllProduct():Promise<any> {
        return await this.productService.findAllProduct()
    }

    // paginate
    @ApiQuery({ name: 'page', required: false, type: String })
    @ApiQuery({ name: 'limit', required: false, type: String })
    @ApiQuery({ name: 'name', required: false, type: String })
    @Get()
    async getAll( @Query('page') page:string, @Query('limit') limit:string, @Query('name') name:string ):Promise<Pagination<ProductEntity>> {
      if(!name)  return await this.productService.paginateService({page:Number(page) || 1,limit:Number(limit) || 5,route:'http://localhost:3000/user'})
                 return await this.productService.paginateByProductName({page:Number(page) || 1,limit:Number(limit) || 5,route:'http://localhost:3000/user'},name)
    }

    // image 
     @ApiBearerAuth('access-token')
     @ApiParam({name:'id',description:'Product ID',type:String})
     @ApiConsumes('multipart/form-data') // báo swagger endpoint dùng multipart 
     @ApiBody({
            schema:{
                type:'object',
                properties: {
                    file:{ type:'string', format:'binary'},
                 },
                required:['file']
             }})
     @UseGuards(JwtGuard)
     @LoggingDecorator()
     @UseInterceptors(
      FileInterceptor('file', {
        storage:diskStorage({
            destination:'./uploads/productImage',
            filename(req, file, cb) {
                try {
                    const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
                    const extension = path.parse(file.originalname).ext
                    return cb(null,`${filename}${extension}`)
                } catch (error) {
                    cb(error,'')
                }
        }
      })  
    }),
     LoggingInterceptor
)
    @Put('upload/:id')
    async uploadFile(@UploadedFile() file,@Param('id') id:string):Promise<any> {
        return await this.productService.updateProductById(id,{image:file.filename})
    }

    // process.cwd() = D:\vmo\vmo-intern
    @Get('product-image/:imagename')
    async findProfileImage(@Param('imagename') imagename,@Res() res):Promise<any> {
      return await res.sendFile(join(process.cwd(),'uploads/productImage/'+imagename))
    }
}

