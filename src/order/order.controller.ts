import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common"
import { OrderService } from "./order.service"
import { JwtGuard } from "src/auth/guard/jwt.guard"
import { OrderDirectDto } from "./order.dto"
import { RoleGuard } from "src/auth/guard/role.guard"
import { ApiTags } from "@nestjs/swagger"


@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService) {}
    
    @UseGuards(JwtGuard)
    @Post('/create-order-cart/:shipmentId/:paymentId')
    async createOrderFromCart(@Req() req,
                              @Param('shipmentId') shipmentId:string,
                              @Param('paymentId') paymentId:string):Promise<any> {
        return await this.orderService.createOrderFromCart(req.user.id,shipmentId,paymentId)
    }

    @UseGuards(JwtGuard)
    @Post('/create-order-direct')
    async createOrderDirect(@Body() orderDto:OrderDirectDto,@Req() req):Promise<any> {
        return await this.orderService.createOrderDirect(req.user.id,orderDto)
    }

    @UseGuards(JwtGuard,RoleGuard)
    @Get('all')
    async getAllOrder():Promise<any>{
        return await this.orderService.getAll()
    }

    @UseGuards(JwtGuard)
    @Get('')
    async getOrderByUserId(@Req() req):Promise<any> {
        return await this.orderService.getOrderByUserId(req.user.id)
    }

    @UseGuards(JwtGuard)
    @Delete(':orderId')
    async deleteOrder(@Req() req,@Param('orderId') orderId:string):Promise<any> {
        return await this.orderService.deleteOrder(req.user.id,orderId)
    }
}