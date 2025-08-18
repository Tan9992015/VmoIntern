import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentDto } from "./payment.dto";
import { JwtGuard } from "src/auth/guard/jwt.guard";

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService:PaymentService) {}


    @Post('create')
    async createPayment(payment:PaymentDto):Promise<any> {
        return await this.paymentService.create(payment)
    }


    @Get('all')
    async findAllPayment():Promise<any> {
        return await this.paymentService.getAllPayment()
    }

    @UseGuards(JwtGuard)
    @Get('user-payments')
    async getAllUserPayent(@Req() req):Promise<any> {
        return await this.paymentService.findUserPayment(req.user.id)
    }

    @UseGuards(JwtGuard)
    @Put('update/:paymentId')
    async updateUserPayment(@Req() req,@Param('paymentId') paymentId:string, @Body() payment:PaymentDto):Promise<any> {
        return await this.paymentService.updatePaymentByUserId(req.user.id,paymentId,payment)
    }

    @UseGuards(JwtGuard)
    @Delete('delete/:paymentId')
    async deletePayment(@Param('paymentId') paymentId:string,@Req() req):Promise<any> {
        return await this.paymentService.deletePayment(req.user.id,paymentId)
    }


}