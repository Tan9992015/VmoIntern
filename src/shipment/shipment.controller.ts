import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ShipmentService } from "./shimpent.service";
import { ShipmentDto } from "./shipment.dto";
import { JwtGuard } from "src/auth/guard/jwt.guard";

@Controller('shipment')
export class ShipmentController {
    constructor(private readonly shipmentService:ShipmentService) {}

    @Post('/create')
    async createShipment(@Body() shipmentDto: ShipmentDto):Promise<any> {
        return await this.shipmentService.createShipment(shipmentDto);
    }

    @Get('/all')
    async getAllShipment():Promise<any> {
        return await this.shipmentService.getAllShipment()
    }

    @Get(':id')
    async getShipmentById(id:string):Promise<any> {
        return await this.shipmentService.getShipmentById(id)
    }

    @UseGuards(JwtGuard)
    @Get('get-shipment-by-userId')
    async getShipmentByUserId(@Req() req):Promise<any> {
        return await this.shipmentService.getShipmentByUserId(req.user.id)
    }

    @UseGuards(JwtGuard)
    @Put('update/:shipmentId')
    async updateShipment(@Req() req,@Param('shipmentId') shipmentId:string,@Body() shipment:ShipmentDto):Promise<any> {
        return await this.shipmentService.updateShipment(req.user.id,shipmentId,shipment)
    }
    
    @UseGuards(JwtGuard)
    @Delete('delete/:id')
    async deleteShipment(@Param('id') id:string,@Req() req):Promise<any> {
        return await this.shipmentService.deleteShipmentByUserIdAndId(req.user.id,id)
    }
}