import { PaymentMethodEnum, PaymentStatusEnum } from "src/enum/payment.enum";

export class PaymentDto {
    paymentMethod?:PaymentMethodEnum
    paymentStatus?:PaymentStatusEnum
    total?:number
    paymentDate?:Date
}