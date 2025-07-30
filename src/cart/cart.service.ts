import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartEntity } from "./cart.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CartSerivce {
    constructor(@InjectRepository(CartEntity)
            private readonly cartRepository:Repository<CartEntity>
) {}
}