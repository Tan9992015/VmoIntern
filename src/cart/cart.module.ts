import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartEntity } from "./cart.entity";
import { CartService } from "./cart.service";
import { UserModule } from "src/user/user.module";
import { CartController } from "./cart.controller";
import { ProductModule } from "src/product/product.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports:[TypeOrmModule.forFeature([CartEntity]),UserModule,ProductModule,AuthModule],
    controllers:[CartController],
    providers:[CartService],
    exports:[CartService]
})
export class CartModule {}