import { Controller } from "@nestjs/common";
import { ShipmentService } from "./shimpent.service";

@Controller()
export class ShipmentController {
    constructor(private readonly shipmentService:ShipmentService) {}
}