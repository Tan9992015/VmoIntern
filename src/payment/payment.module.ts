import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentEntity } from "./payment.entity";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

@Module({
    imports:[TypeOrmModule.forFeature([PaymentEntity])],
    controllers:[PaymentController],
    providers:[PaymentService],
    exports:[PaymentService]
})
export class PaymentModule {}