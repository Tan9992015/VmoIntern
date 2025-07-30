import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderProductEntity } from "./orderProduct.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderProductService {
    constructor(@InjectRepository(OrderProductEntity)
                private readonly orderProductRepository: Repository<OrderProductEntity>
) {}
}