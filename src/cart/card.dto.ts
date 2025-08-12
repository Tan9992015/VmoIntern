import { IsNumber, IsOptional, Min } from "class-validator";

export class CartDto {
    @IsOptional()
    productId:string

    @IsNumber()
    @Min(1)
    quantity:number
}
