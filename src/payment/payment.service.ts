import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentEntity } from "./payment.entity";
import { Repository } from "typeorm";

@Injectable()
export class PaymentService {
    constructor(@InjectRepository(PaymentEntity)
                private readonly paymentRepository:Repository<PaymentEntity>
) { }
}