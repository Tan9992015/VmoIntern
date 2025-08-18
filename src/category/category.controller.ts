import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryAllOptionnal, CategoryDto } from "./category.dto";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService:CategoryService) { }
    
    @Post('create')
    async createCategory(category:CategoryDto):Promise<any> {
        return await this.categoryService.createCategory(category)
    }

    @Get('all')
    async getAllCategory():Promise<any> {
        return await this.categoryService.findAllCategory()
    }

    @Get(':id')
    async getCategoryById(@Param('id') id:string): Promise<any>{
        return await this.categoryService.findCategoryById(id)
    }

    @Put(':id')
    async updateCategoryById(@Param('id') id:string,category:CategoryAllOptionnal):Promise<any> {
        return await this.categoryService.updateCategory(id,category)
    }

    @Delete(':id')
    async deleteCategoryById(@Param('id') id:string):Promise<any> {
        return await this.categoryService.deleteCategory(id)
    }
}