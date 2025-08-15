import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShipmentEntity } from "./shipment.entity";
import { ShipmentController } from "./shipment.controller";
import { ShipmentService } from "./shimpent.service";
import { UserModule } from "src/user/user.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports:[TypeOrmModule.forFeature([ShipmentEntity]),forwardRef(()=>UserModule),AuthModule],
    controllers:[ShipmentController],
    providers:[ShipmentService],
    exports:[ShipmentService]
})
export class ShipmentModule {}