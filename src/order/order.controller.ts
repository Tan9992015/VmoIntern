import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common"
import { OrderService } from "./order.service"
import { JwtGuard } from "src/auth/guard/jwt.guard"
import { OrderDirectDto } from "./order.dto"
import { RoleGuard } from "src/auth/guard/role.guard"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { LoggingDecorator } from "src/logging/logging.decorator"
import { LoggingInterceptor } from "src/logging/logging.interceptor"


@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService) {}
    

    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Post('/create-order-cart/:shipmentId/:paymentId')
    async createOrderFromCart(@Req() req,
                              @Param('shipmentId') shipmentId:string,
                              @Param('paymentId') paymentId:string):Promise<any> {
        return await this.orderService.createOrderFromCart(req.user.id,shipmentId,paymentId)
    }


    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Post('/create-order-direct')
    async createOrderDirect(@Body() orderDto:OrderDirectDto,@Req() req):Promise<any> {
        return await this.orderService.createOrderDirect(req.user.id,orderDto)
    }


    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard,RoleGuard)
    @Get('all')
    async getAllOrder():Promise<any>{
        return await this.orderService.getAll()
    }


    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard)
    @Get('findOrderByUserId')
    async getOrderByUserId(@Req() req):Promise<any> {
        return await this.orderService.getOrderByUserId(req.user.id)
    }


    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Delete(':orderId')
    async deleteOrder(@Req() req,@Param('orderId') orderId:string):Promise<any> {
        return await this.orderService.deleteOrder(req.user.id,orderId)
    }
}