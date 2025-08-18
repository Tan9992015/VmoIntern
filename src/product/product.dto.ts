import { PartialType } from "@nestjs/mapped-types"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { CategoryEntity } from "src/category/category.entity"

export class ProductDto {

    @ApiPropertyOptional()
    @IsOptional()
    id:string


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    stock:number

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    image:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price:number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    categoryId:string
}

export class ProductAllOptional extends PartialType(ProductDto) {}
