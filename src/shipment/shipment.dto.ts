import { IsEnum, IsOptional } from "class-validator"
import { ShipmmentMethod, ShipmmentStatus } from "src/enum/shipment.enum"

export class ShipmentDto {
    @IsOptional()
    id:string

    @IsOptional()
    address:string

    @IsOptional()
    @IsEnum(ShipmmentMethod)
    shipmentMethod:ShipmmentMethod

    @IsOptional()
    @IsEnum(ShipmmentStatus)
    shipmentStatus:ShipmmentStatus

    @IsOptional()
    userId:string

    @IsOptional()
    orderId:string
}

