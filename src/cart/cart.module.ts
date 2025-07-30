import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartEntity } from "./cart.entity";
import { CartSerivce } from "./cart.service";

@Module({
    imports:[TypeOrmModule.forFeature([CartEntity])],
    controllers:[],
    providers:[CartSerivce],
    exports:[CartSerivce]
})
export class CartModule {}