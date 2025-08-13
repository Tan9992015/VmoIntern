import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CartDto {
    @IsOptional()
    productId:string


    @Type(()=>Number)
    @IsNumber()
    @Min(1)
    quantity:number
}

export class CartUpdateDto {
    @Type(()=>Number)
    @IsNumber()
    @Min(1)
    quantity:Number

    @IsOptional()
    @IsIn(['set', 'add', 'subtract'])
    operation:'set' | 'add' | 'subtract' = 'set' // mặc định sẻ
}
