import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CartDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productId:string

    @ApiProperty()
    @IsNotEmpty()
    @Type(()=>Number)
    @IsNumber()
    @Min(1)
    quantity:number
}

export class CartUpdateDto {

    @ApiPropertyOptional()
    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    @Min(1)
    quantity:Number

    @ApiPropertyOptional()
    @IsOptional()
    @IsIn(['set', 'add', 'subtract'])
    operation:'set' | 'add' | 'subtract' = 'set' // mặc định sẻ
}
