import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"

export class OrderItemDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    productId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number
}

export class OrderDirectDto {

    @ApiProperty()
    @IsArray()
    @Type(()=>OrderItemDto)
    items: OrderItemDto[]


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    shipmentId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    paymentId: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    note: string
}

