import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common"
import { ShipmentService } from "./shimpent.service"
import { ShipmentAllOptional, ShipmentDto } from "./shipment.dto"
import { JwtGuard } from "src/auth/guard/jwt.guard"
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { LoggingDecorator } from "src/logging/logging.decorator";
import { LoggingInterceptor } from "src/logging/logging.interceptor";
import { RoleGuard } from "src/auth/guard/role.guard";


@ApiTags('shipment')
@Controller('shipment')
export class ShipmentController {
    constructor(private readonly shipmentService:ShipmentService) {}

    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Post('/create')
    async createShipment(@Body() shipmentDto: ShipmentDto,@Req() req):Promise<any> {
        return await this.shipmentService.createShipment(shipmentDto,req.user.id);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard,RoleGuard)
    @Get('/all')
    async getAllShipment():Promise<any> {
        return await this.shipmentService.getAllShipment()
    }


    @ApiParam({name:'shipmentId',description:'Shipment ID',type:String})
    @Get(':shipmentId')
    async getShipmentById(@Param('shipmentId') id:string):Promise<any> {
        return await this.shipmentService.getShipmentById(id)
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard)
    @Get('get/shipmentByUserId')
    async getShipmentByUserId(@Req() req):Promise<any> {
        return await this.shipmentService.getShipmentByUserId(req.user.id)
    }

    @ApiBearerAuth('access-token')
    @ApiParam({name:'shipmentId',description:'Shipment ID',type:String})
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Put('update/:shipmentId')
    async updateShipment(@Req() req,@Param('shipmentId') shipmentId:string,@Body() shipment:ShipmentAllOptional):Promise<any> {
        return await this.shipmentService.updateShipment(req.user.id,shipmentId,shipment)
    }
    

    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Delete('delete/:id')
    async deleteShipment(@Param('id') id:string,@Req() req):Promise<any> {
        return await this.shipmentService.deleteShipmentByUserIdAndId(req.user.id,id)
    }
}