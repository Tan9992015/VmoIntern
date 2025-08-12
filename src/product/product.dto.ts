import { PartialType } from "@nestjs/mapped-types"
import { IsNotEmpty, IsOptional } from "class-validator"
import { CategoryEntity } from "src/category/category.entity"

export class ProductDto {
    @IsOptional()
    id:string

    @IsNotEmpty()
    name:string

    @IsOptional()
    description?:string

    @IsNotEmpty()
    stock:number

    @IsOptional()
    image:string

    @IsNotEmpty()
    price:number

    @IsOptional()
    categoryId:string
}

export class ProductAllOptional extends PartialType(ProductDto) {}
