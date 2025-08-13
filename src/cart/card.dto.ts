import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class CartDto {
    @IsOptional()
    productId:string


    @Type(()=>Number)
    @IsNumber()
    @Min(1)
    quantity:number
}
