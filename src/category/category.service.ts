import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./category.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryService{
    constructor(@InjectRepository(CategoryEntity)
                private readonly categoryService:Repository<CategoryEntity>
) { }
}