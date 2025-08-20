import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryAllOptionnal, CategoryDto } from "./category.dto";
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { RoleGuard } from "src/auth/guard/role.guard";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { LoggingDecorator } from "src/logging/logging.decorator";
import { LoggingInterceptor } from "src/logging/logging.interceptor";


@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService:CategoryService) { }
    

    @ApiBearerAuth('access-token')
    @ApiBody({type:CategoryDto})
    @UseGuards(JwtGuard,RoleGuard)
    @Post('create')
    async createCategory(@Body() category:CategoryDto):Promise<any> {
        return await this.categoryService.createCategory(category)
    }


    @Get('find/all')
    async getAllCategory():Promise<any> {
        return await this.categoryService.findAllCategory()
    }


    @ApiParam({name:'id',description:'Category Id',type:String})
    @Get('find/:id')
    async getCategoryById(@Param('id') id:string): Promise<any>{
        return await this.categoryService.findCategoryById(id)
    }

    @ApiBearerAuth('access-token')
    @ApiParam({name:'id',description:'Category Id',type:String})
    @ApiBody({type:CategoryAllOptionnal})
    @UseGuards(JwtGuard,RoleGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Put('update/:id')
    async updateCategoryById(@Param('id') id:string,@Body() category:CategoryAllOptionnal):Promise<any> {
        return await this.categoryService.updateCategory(id,category)
    }


    @ApiBearerAuth('access-token')
    @ApiParam({name:'id',description:'Category Id',type:String})
    @UseGuards(JwtGuard,RoleGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Delete('delete/:id')
    async deleteCategoryById(@Param('id') id:string):Promise<any> {
        return await this.categoryService.deleteCategory(id)
    }
}