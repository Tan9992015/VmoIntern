import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderProductEntity } from "./orderProduct.entity";
import { OrderProductController } from "./orderProduct.controller";
import { OrderProductService } from "./orderProduct.service";

@Module({
    imports:[TypeOrmModule.forFeature([OrderProductEntity])],
    controllers:[OrderProductController],
    providers:[OrderProductService],
    exports:[OrderProductService]
})
export class OrderProductModule {}