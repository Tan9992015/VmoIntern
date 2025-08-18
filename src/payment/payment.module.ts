import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentEntity } from "./payment.entity";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { UserModule } from "src/user/user.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports:[TypeOrmModule.forFeature([PaymentEntity]),forwardRef(()=>UserModule),AuthModule],
    controllers:[PaymentController],
    providers:[PaymentService],
    exports:[PaymentService]
})
export class PaymentModule {}