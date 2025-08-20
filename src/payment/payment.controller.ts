import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common"
import { PaymentService } from "./payment.service"
import { PaymentAllOptional, PaymentDto } from "./payment.dto"
import { JwtGuard } from "src/auth/guard/jwt.guard"
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger"
import { RoleGuard } from "src/auth/guard/role.guard"
import { LoggingDecorator } from "src/logging/logging.decorator"
import { LoggingInterceptor } from "src/logging/logging.interceptor"


@ApiTags('payment')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService:PaymentService) {}

    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Post('create')
    async createPayment(@Body() payment:PaymentDto,@Req() req):Promise<any> {
        return await this.paymentService.create(payment,req.user.id)
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard,RoleGuard)
    @Get('all')
    async findAllPayment():Promise<any> {
        return await this.paymentService.getAllPayment()
    }


    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard)
    @Get('user-payments')
    async getAllUserPayent(@Req() req):Promise<any> {
        return await this.paymentService.findUserPayment(req.user.id)
    }

    @ApiBearerAuth('access-token')
    @ApiParam({name:'paymentId',description:'payment need to update',type:String})
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Put('update/:paymentId')
    async updateUserPayment(@Req() req,@Param('paymentId') paymentId:string, @Body() payment:PaymentAllOptional):Promise<any> {
        return await this.paymentService.updatePaymentByUserId(req.user.id,paymentId,payment)
    }

    @ApiBearerAuth('access-token')
    @ApiParam({name:'paymentId',description:'payment need to update',type:String})
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Delete('delete/:paymentId')
    async deletePayment(@Param('paymentId') paymentId:string,@Req() req):Promise<any> {
        return await this.paymentService.deletePayment(req.user.id,paymentId)
    }


}