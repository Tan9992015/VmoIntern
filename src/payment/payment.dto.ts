import { IsDate, IsNumber, IsOptional } from "class-validator";
import { PaymentMethodEnum, PaymentStatusEnum } from "src/enum/payment.enum";

export class PaymentDto {

    @IsOptional()
    paymentMethod:PaymentMethodEnum

    @IsOptional()
    paymentStatus:PaymentStatusEnum
    
    @IsOptional()
    @IsNumber()
    total:number

    @IsOptional()
    @IsDate()
    paymentDate:Date

    @IsOptional()
    userId:string

}