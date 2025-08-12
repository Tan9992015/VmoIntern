import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./category.entity";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { ProductModule } from "src/product/product.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports:[TypeOrmModule.forFeature([CategoryEntity]),forwardRef(()=>ProductModule),AuthModule],
    controllers:[CategoryController],
    providers:[CategoryService],
    exports:[CategoryService,TypeOrmModule]
})
export class CategoryModule {}