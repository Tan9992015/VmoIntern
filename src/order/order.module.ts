import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./order.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { CartModule } from "src/cart/cart.module";
import { UserModule } from "src/user/user.module";
import { OrderProductEntity } from "src/order_product/orderProduct.entity";
import { ProductModule } from "src/product/product.module";
import { OrderProductModule } from "src/order_product/orderProduct.module";
import { AuthModule } from "src/auth/auth.module";
import { ShipmentModule } from "src/shipment/shipment.module";

@Module({
    imports:[TypeOrmModule.forFeature([OrderEntity,OrderProductEntity]),
    CartModule,forwardRef(()=>UserModule),
    ProductModule,OrderProductModule,
    AuthModule,ShipmentModule],
    controllers:[OrderController],
    providers:[OrderService],
    exports:[OrderService]
})
export class OrderModule {}