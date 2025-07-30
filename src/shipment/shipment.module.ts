import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShipmentEntity } from "./shipment.entity";
import { ShipmentController } from "./shipment.controller";
import { ShipmentService } from "./shimpent.service";

@Module({
    imports:[TypeOrmModule.forFeature([ShipmentEntity])],
    controllers:[ShipmentController],
    providers:[ShipmentService],
    exports:[ShipmentService]
})
export class ShipmentModule {}