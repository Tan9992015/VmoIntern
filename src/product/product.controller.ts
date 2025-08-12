import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductAllOptional, ProductDto } from "./product.dto";
import { ProductEntity } from "./product.entity";
import { Pagination } from "nestjs-typeorm-paginate";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { Role } from "src/enum/role.enum";
import { RoleGuard } from "src/auth/guard/role.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import {v4 as uuidv4} from 'uuid'
import * as path from "path";
import { join } from "path";

@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService) { }

    @Post('/create')
    async createProduct(@Body() product:ProductDto):Promise<any> {
        return await this.productService.create(product)
    }

    @Put(':id')
    async updateProduc(@Param('id') id:string, @Body() product:ProductAllOptional):Promise<any> {
        return await this.productService.updateProductById(id,product)
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Delete(':id')
    async deleteProduct(@Param('id') id:string):Promise<any> {
        return await this.productService.deleteProduct(id)
    }

    @Get(':id')
    async getProductById(@Param('id') id:string):Promise<ProductEntity> {
        return await this.productService.findOneById(id)
    }

    // paginate
    @Get()
    async getAll( @Query('page') page:string, @Query('limit') limit:string, @Query('name') name:string ):Promise<Pagination<ProductEntity>> {
      if(!name)  return await this.productService.paginateService({page:Number(page) || 1,limit:Number(limit) || 5,route:'http://localhost:3000/user'})
                 return await this.productService.paginateByProductName({page:Number(page) || 1,limit:Number(limit) || 5,route:'http://localhost:3000/user'},name)
    }

    // image 
     @UseInterceptors(FileInterceptor('file', {
      storage:diskStorage({
        destination:'./uploads/productImage',
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
    @Put('upload/:id')
    async uploadFile(@UploadedFile() file,@Param('id') id:string):Promise<any> {
        console.log('file after process',file)
        return await this.productService.updateProductById(id,{image:file.filename})
    }

    // process.cwd() = D:\vmo\vmo-intern
    @Get('product-image/:imagename')
    async findProfileImage(@Param('imagename') imagename,@Res() res):Promise<any> {
      console.log('cwd ', process.cwd)
      return await res.sendFile(join(process.cwd(),'uploads/productImage/'+imagename))
    }
}

