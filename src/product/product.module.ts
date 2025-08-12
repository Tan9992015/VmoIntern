import { forwardRef, Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { AuthModule } from "src/auth/auth.module";
import { CategoryModule } from "src/category/category.module";

@Module({
    imports:[TypeOrmModule.forFeature([ProductEntity]),AuthModule,forwardRef(()=>CategoryModule)],
    controllers:[ProductController],
    providers:[ProductService],
    exports:[ProductService,TypeOrmModule]
})
export class ProductModule {}