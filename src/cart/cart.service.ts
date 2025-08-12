import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartEntity } from "./cart.entity";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/user/user.entity";
import { UserAllOptional } from "src/user/user.dto";
import { CartDto } from "./card.dto";
import { UserService } from "src/user/user.service";
import { ProductEntity } from "src/product/product.entity";

@Injectable()
export class CartService {
    constructor(@InjectRepository(CartEntity)
            private readonly cartRepository:Repository<CartEntity>,
            private readonly userService:UserService,
            @InjectRepository(ProductEntity)
            private readonly productRepository:Repository<ProductEntity>
) {}

    async createCart(user:UserAllOptional,cart:CartDto):Promise<any> {
       try {
         const foundUser = this.userService.findOneByEmai(user.email || '')
        if(!foundUser) return {
            err:1,
            mess:'user not found'
        }
        const newCart = new CartEntity()
        const cartProduct = await this.productRepository.findOne({where:{id:cart.productId}}) 
        if(!cartProduct) return {
            err:1,
            mess:"product not found"
        }
        newCart.product = cartProduct
        newCart.quantity = cart.quantity ?? 1
        const createCart = await this.cartRepository.create(newCart)
        if(!createCart) return {
            err:1,
            mess:'create cart fail '
        }

        return {
            err:0,
            mess:'creat cart success'
        }
       } catch (error) {
         throw new Error(error)
       }
    }

}