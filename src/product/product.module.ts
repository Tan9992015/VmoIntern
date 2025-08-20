import { forwardRef, Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { AuthModule } from "src/auth/auth.module";
import { CategoryModule } from "src/category/category.module";
import { LoggingModule } from "src/logging/logging.module";

@Module({
    imports:[TypeOrmModule.forFeature([ProductEntity]),AuthModule,forwardRef(()=>CategoryModule),LoggingModule],
    controllers:[ProductController],
    providers:[ProductService],
    exports:[ProductService,TypeOrmModule]
})
export class ProductModule {}