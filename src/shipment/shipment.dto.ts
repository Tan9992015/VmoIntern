import { PartialType } from "@nestjs/mapped-types"
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ShipmmentMethod, ShipmmentStatus } from "src/enum/shipment.enum"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class ShipmentDto {

    @ApiPropertyOptional()
    @IsOptional()
    id:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address:string

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ShipmmentMethod)
    shipmentMethod:ShipmmentMethod

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ShipmmentStatus)
    shipmentStatus:ShipmmentStatus

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId:string

}

export class ShipmentAllOptional extends PartialType(ShipmentDto) {}
