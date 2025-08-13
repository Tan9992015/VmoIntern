import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartDto, CartUpdateDto } from "./card.dto";
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

    @UseGuards(JwtGuard)
    @Put(':productId')
    async updateProductQuantity(@Req() req,
                                @Param('productId') productId:string,
                                @Body() cart:CartUpdateDto):Promise<any> {
        const userId=req.user.id
        return await this.cartService.updateCart(userId,productId,cart)
    }

    @UseGuards(JwtGuard)
    @Delete(':productId')
    async deleteProductFromCart(@Req() req,@Param('productId') productId:string):Promise<any> {
        const userId= req.user.id
        return await this.cartService.deleteProductFromCart(productId,userId)
    }

    @UseGuards(JwtGuard)
    @Delete()
    async deleteUserCart(@Req() req):Promise<any> {
        const userId = req.user.id
        return await this.cartService.deleteUserCart(userId)
    }
}