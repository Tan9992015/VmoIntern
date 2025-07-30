import { ShipmmentMethod, ShipmmentStatus } from "src/enum/shipment.enum"

export class ShipmentDto {
    id?:string
    address?:string
    shipmentMethod?:ShipmmentMethod
    shipmentStatus?:ShipmmentStatus
}