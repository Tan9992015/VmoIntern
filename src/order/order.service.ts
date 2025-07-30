import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "./order.entity";
import { Repository } from "typeorm";

export class OrderService {
    constructor(@InjectRepository(OrderEntity)
                private readonly orderRepository:Repository<OrderEntity>
) { }
}