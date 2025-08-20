import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartEntity } from "./cart.entity";
import { Injectable, forwardRef, Inject } from "@nestjs/common";
import { UserEntity } from "src/user/user.entity";
import { UserAllOptional } from "src/user/user.dto";
import { CartDto, CartUpdateDto } from "./card.dto";
import { UserService } from "src/user/user.service";
import { ProductEntity } from "src/product/product.entity";

@Injectable()
export class CartService {
    constructor(@InjectRepository(CartEntity)
            private readonly cartRepository:Repository<CartEntity>,
            @Inject(forwardRef(() => UserService))
            private readonly userService:UserService,
            @InjectRepository(ProductEntity)
            private readonly productRepository:Repository<ProductEntity>
) {}

    async createCart(user:UserAllOptional,cart:CartDto):Promise<any> {
       try {
        const foundUser = await this.userService.findOneByEmai(user.email || '')
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
        if (Number(cart.quantity) > Number(cartProduct.stock)) 
        return {
        err: 1,
        mess: `quantity must lower or equal ${cartProduct.stock} in stock.`
      }
        newCart.user = await foundUser
        newCart.product = cartProduct
        newCart.quantity = cart.quantity
        const createCart = await this.cartRepository.save(newCart)
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


    async getCartByUserId(id:string):Promise<any> {
        const foundCart = await this.cartRepository.find({ where:{user: {id:id}}, 
                                                           relations:['product','user'],
                                                           select:{
                                                            product:{
                                                                id:true,
                                                                name:true,
                                                                price:true,
                                                                stock:true
                                                            },
                                                            user: {
                                                                id:true,
                                                                name:true,
                                                                email:true,
                                                                address:true,
                                                                phoneNumber:true
                                                            }
                                                           }
                                                        })
        if(!foundCart || foundCart.length === 0) return {
            err:1,
            mess:"cart not found or not exist",
            cart:[],
            totalItems:0,
            totalValue:0
        }
       let sum = 0
       foundCart.forEach((cart,index)=> {sum += Number(cart.product.price) * Number(cart.quantity)})
       return {
        err:0,
        mess:"found cart success",
        cart:foundCart,
        totalItems:foundCart.length,
        totalValue:sum
       }
    }

    async updateCart(userId:string,productId:string,cart:CartUpdateDto):Promise<any> {
       try {
         const foundCart = await this.cartRepository.findOne({
            where:{
                user:{id:userId},
                product:{id:productId}
            }
         })
        if(!foundCart) return {
            err:1,
            mess:'cart item not found'
        }

        const oldQuantity = foundCart.quantity
        let quantity:number

        switch(cart.operation) {
            case 'add':
                quantity = Number(foundCart.quantity) + Number(cart.quantity)
            break
            case 'subtract':
                quantity = Number(foundCart.quantity) - Number(cart.quantity)
            break
            case 'set':
                default: quantity = Number(cart.quantity);
            break
        }

        if(quantity <=0) return {
            err:1,
            mess:'quantity must greater than 0'
        }

        foundCart.quantity = quantity
        await this.cartRepository.save(foundCart)

        return {
            err:0,
            mess:'update product quantity in cart success',
            newCart:foundCart,
            operation:cart.operation,
            oldQuantity:oldQuantity,
            newQuantity:foundCart.quantity
        }
       } catch (error) {
            throw new Error(error)
       }    
    }

    async deleteProductFromCart(productId:string,userId:string):Promise<any> {
        try {
            const foundCart = await this.cartRepository.findOne({where:{ 
                                                                        user: { id:userId },
                                                                        product: {id:productId} 
                                                                    }})
            if(!foundCart) return {
                err:1,
                mess:"cart not found"
            }
            const deleteCart = await this.cartRepository.softDelete(foundCart.id)
            if(!deleteCart) return {
                err:1,
                mess:'delete product from cart fail'
            }
            return {
                err:0,
                mess:'delete product from cart success',
                cart: deleteCart
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteUserCart(userId:string):Promise<any> {
     
        try {
            const foundCart = await this.cartRepository.find({
            where: {user: {id : userId}},
            relations:['product']
        })

        const removeItems = foundCart.map((item)=> ({
            productId:item.product.id,
            productName:item.product.name,
            quantity:item.quantity
        }))

        const cartsId = foundCart.map(cart=>cart.id)
        await this.cartRepository.softDelete(cartsId) // soft delte chỉ nhận id hoặc array id

        return {
            err:0,
            mess:'user delete all cart success',
            removeItems: removeItems
        }
        } catch (error) {
         throw new Error(error)   
        }
    }
}