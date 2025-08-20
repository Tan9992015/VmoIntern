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
        console.log(category)
        try {
         let newCategory = new CategoryEntity()
           newCategory.name = category.name 
            // save category to db
            const savedCategory = await this.categoryRepository.save(newCategory)
            if(!savedCategory) return {
                error:1,
                mess:'can not create category'
            }
            return {
                erro:0,
                mess:'create category success',
                category: await savedCategory
                }
        }
         catch (error) {
                throw new Error(error)
        }
    }

     async deleteCategory(id:string):Promise<any> {
       try {
        const foundCategory = await this.categoryRepository.findOne({where:{id}})
          if(!foundCategory) return {
            err:1,
            mess:'category not found'
          }
         await this.categoryRepository.softDelete(id)
         return {
            err:0,
            mess:'delete category success'
         }
       } catch (error) {
        throw new Error(error)
       }
    }

    async findAllCategory():Promise<CategoryEntity[]> {
        try {
            
            return await this.categoryRepository.find()
        } catch (error) {
            throw new Error(error)
        }
    }

    async findCategoryById(id:string):Promise<any> {
        try {
            const foundCategory = await this.categoryRepository.findOne({where:{id}})
          if(!foundCategory) return {
            err:1,
            mess:'category not found'
          }
          return {
            err:0,
            mess:'found category success',
            category: await this.categoryRepository.findOne({where:{id},relations:['product']})
          }
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateCategory(id:string,category:CategoryAllOptionnal):Promise<any> {
       try {
          const foundCategory = await this.categoryRepository.findOne({where:{id}})
          if(!foundCategory) return {
            err:1,
            mess:'category not found'
          }
          await this.categoryRepository.update(id,category)
          return {
            err:0,
            mess:'update category success',
            categoryPostUpdate: await this.categoryRepository.findOne({where:{id}})
          }
       } catch (error) {
        throw new Error(error)
       }
    }
}
