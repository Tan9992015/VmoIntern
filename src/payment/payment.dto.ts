import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    paymentDate:Date

}

export class PaymentAllOptional extends PartialType(PaymentDto) {}