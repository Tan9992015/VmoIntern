import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity) 
                private readonly productRepository: Repository<ProductEntity>
            ) { }
}