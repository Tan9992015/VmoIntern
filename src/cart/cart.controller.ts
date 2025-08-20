import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartDto, CartUpdateDto } from "./card.dto";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { LoggingDecorator } from "src/logging/logging.decorator";
import { LoggingInterceptor } from "src/logging/logging.interceptor";


@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService:CartService) {}

    @ApiBearerAuth('access-token')
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @UseGuards(JwtGuard)
    @Post('create')
    async createCart(@Body() cart:CartDto, @Req() req):Promise<any> {
        const user = req.user
        return await this.cartService.createCart(user,cart)
    }


    @ApiParam({name:'id',description:'user id', type:String})
    @Get('getcardByUserId/:id')
    async getCartByUserId(@Param('id') id:string):Promise<any> {
        return await this.cartService.getCartByUserId(id)
    }


    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Put(':productId')
    async updateProductQuantity(@Req() req,
                                @Param('productId') productId:string,
                                @Body() cart:CartUpdateDto):Promise<any> {
        const userId=req.user.id
        return await this.cartService.updateCart(userId,productId,cart)
    }


    @ApiBearerAuth('access-token')
    @ApiParam({name:'productId',description:'product id need to delete from cart', type:String})
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Delete('delete/productCart/:productId')
    async deleteProductFromCart(@Req() req,@Param('productId') productId:string):Promise<any> {
        const userId= req.user.id
        return await this.cartService.deleteProductFromCart(productId,userId)
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard)
    @LoggingDecorator()
    @UseInterceptors(LoggingInterceptor)
    @Delete('delete/allCartFromUser')
    async deleteUserCart(@Req() req):Promise<any> {
        const userId = req.user.id
        return await this.cartService.deleteUserCart(userId)
    }
}