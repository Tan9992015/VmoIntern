import { Controller } from "@nestjs/common";
import { OrderProductService } from "./orderProduct.service";

@Controller()
export class OrderProductController {
    constructor(private readonly orderProductService:OrderProductService) {}
}