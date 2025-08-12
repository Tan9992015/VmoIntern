import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./category.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CategoryAllOptionnal, CategoryDto } from "./category.dto";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryEntity)
                private readonly categoryRepository:Repository<CategoryEntity>
) { }

    async createCategory(category:CategoryDto):Promise<any> {
        try {
         let newCategory = new CategoryEntity()
           newCategory.name = category.name ?? ''
            // save category to db
            const savedUser = await this.categoryRepository.save(newCategory)
            if(!savedUser) return {
                error:1,
                mess:'can not create category'
            }
            return {
                erro:0,
                mess:'create category success',
                }
        }
         catch (error) {
                throw new Error(error)
        }
    }

     async deleteCategory(id:string):Promise<any> {
       return await this.categoryRepository.softDelete(id)
    }

    async findAllCategory():Promise<CategoryEntity[]> {
        return await this.categoryRepository.find()
    }

    async findCategoryById(id:string):Promise<any> {
        return await this.categoryRepository.findOne({where:{id},relations:['product']})
    }

    async updateCategory(id:string,category:CategoryAllOptionnal):Promise<any> {
        return await this.categoryRepository.update(id,category)
    }
}
