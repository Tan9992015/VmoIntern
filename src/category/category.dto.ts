import { PartialType } from "@nestjs/mapped-types"
import { IsOptional } from "class-validator"
import { ProductEntity } from "src/product/product.entity"

export class CategoryDto {
    @IsOptional()
    id:string

    @IsOptional()
    name:string

    @IsOptional()
    product:ProductEntity[]
}

export class CategoryAllOptionnal extends PartialType(CategoryDto) {}