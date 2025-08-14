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
    @IsOptional()
    shipmentId?: string

    @IsString()
    @IsOptional()
    paymentId?: string

    @IsString()
    @IsOptional()
    note?: string
}

