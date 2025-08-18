import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { PaymentMethodEnum, PaymentStatusEnum } from "src/enum/payment.enum";

export class PaymentDto {
    @ApiProperty()
    @IsNotEmpty()
    paymentMethod:PaymentMethodEnum

    @ApiProperty()
    @IsNotEmpty()
    paymentStatus:PaymentStatusEnum
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    total:number

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    paymentDate:Date

    @ApiProperty()
    @IsNotEmpty()
    userId:string

}

export class PaymentAllOptional extends PartialType(PaymentDto) {}