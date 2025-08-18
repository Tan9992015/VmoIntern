import { Type } from "class-transformer"
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator"

export class OrderItemDto {
    @IsOptional()
    productId: string

    @IsOptional()
    quantity: number

    @IsOptional()
    price?: number
}

export class OrderDirectDto {
    @IsArray()
    @Type(()=>OrderItemDto)
    items: OrderItemDto[]

    @IsString()
    shipmentId: string

    @IsString()
    paymentId: string

    @IsString()
    @IsOptional()
    note?: string
}

