import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartDto } from "./card.dto";
import { JwtGuard } from "src/auth/guard/jwt.guard";

@Controller('cart')
export class CartController {
    constructor(private readonly cartService:CartService) {}


    @UseGuards(JwtGuard)
    @Post('create')
    async createCart(@Body() cart:CartDto, @Req() req):Promise<any> {
        const user = req.user
        return await this.cartService.createCart(user,cart)
    }

    @Get(':id')
    async getCartByUserId(@Param('id') id:string):Promise<any> {
        return await this.cartService.getCartByUserId(id)
    }
}