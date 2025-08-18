import { PartialType } from "@nestjs/mapped-types"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ProductEntity } from "src/product/product.entity"

export class CategoryDto {


    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    id:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string

}

export class CategoryAllOptionnal extends PartialType(CategoryDto) {}