import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ShipmentEntity } from "./shipment.entity";
import { Repository } from "typeorm";

@Injectable()
export class ShipmentService {
    constructor(@InjectRepository(ShipmentEntity)
                private readonly shipmentRepository:Repository<ShipmentEntity>
) {}
}