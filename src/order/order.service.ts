import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "./order.entity";
import { Repository } from "typeorm";
import { CartService } from "src/cart/cart.service";
import { UserService } from "src/user/user.service";
import { ShipmentEntity } from "src/shipment/shipment.entity";
import { OrderProductEntity } from "src/order_product/orderProduct.entity";
import {  OrderDirectDto } from "./order.dto";
import { ProductService } from "src/product/product.service";

export class OrderService {
    constructor(@InjectRepository(OrderEntity)
                private readonly orderRepository:Repository<OrderEntity>,
                @InjectRepository(OrderProductEntity)
                private readonly orderProductRepository:Repository<OrderProductEntity>,
                private readonly cartService:CartService,
                private readonly userService:UserService,
                private readonly productService:ProductService
) { }

    async createOrderFromCart(userId:string):Promise<any> {
        try {
            const foundCartByUserId = await this.cartService.getCartByUserId(userId)
            console.log(foundCartByUserId)
            if(!foundCartByUserId) return {
                err:1,
                mess:"cart not found"
            }
            let sum =0 
            foundCartByUserId.cart.forEach((cart)=> {
                sum+=Number(cart.quantity)*Number(cart.product.price)
            })

            // crate new order
            const newOrder = new OrderEntity()
            newOrder.user = await this.userService.findOneById(userId)
            newOrder.totalPrice = sum

            // create order products
            const orderProducts: OrderProductEntity[] = []
            for (const cartItem of foundCartByUserId.cart) {
                const op = new OrderProductEntity()
                op.product = cartItem.product
                console.log(cartItem.product)
                console.log('cart item quantity',cartItem.quantity)
                op.quantity = cartItem.quantity
                op.price = cartItem.product.price
                op.order = newOrder
                orderProducts.push(op)
            }

            const savedOrder = await this.orderRepository.save(newOrder)
            await this.orderProductRepository.save(orderProducts)

            return {
                err:0,
                mess:'create order from cart success',
                order: savedOrder
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async createOrderDirect(userId:string,orderDto:OrderDirectDto): Promise<any> {
        const user = await this.userService.findOneById(userId)
        if (!user) return { err: 1, mess: 'user not found' }

        const newOrder = new OrderEntity()
        newOrder.user = user

        const orderProducts: OrderProductEntity[] = []
        let total = 0
        for (const item of orderDto.items) {
            const op = new OrderProductEntity()
            const foundProduct = await this.productService.findOneById(item.productId)
            console.log('1',foundProduct)
            console.log('2',item.quantity)
            console.log('3',foundProduct.product.price)
            op.product = foundProduct.product
            op.quantity = item.quantity
            op.price =  foundProduct.product.price 
            op.order = newOrder
            orderProducts.push(op)
            total+=Number(item.quantity)*Number(foundProduct.product.price)
        }
        newOrder.totalPrice = total

        const savedOrder = await this.orderRepository.save(newOrder)
        await this.orderProductRepository.save(orderProducts)

        return { err: 0, mess: 'create order success', orderId: savedOrder }
    }

    async getAll():Promise<any> {
        return await this.orderRepository.find()
    }

    async getOrderByUserId(userId:string):Promise<any> {
        return await this.orderRepository.findOne({where:{user:{id:userId}}})
    }

    async deleteOrder(userId,orderId:string):Promise<any> {
        const foudOrders= await this.orderRepository.find({where:{ user:{ id:userId } } })
        let check:boolean = false
        for(const order of foudOrders){
            if(orderId===order.id){
                check = true
                break
            }
        }
        if(check===false) return {
            err:1,
            mess:'order not belong to user to delete'
        }
        await this.orderRepository.softDelete(orderId)
        return {
            err:0,
            mess:'delete success'
        }
    }
}