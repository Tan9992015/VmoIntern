import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "./order.entity";
import { Repository,DataSource } from "typeorm";
import { CartService } from "src/cart/cart.service";
import { UserService } from "src/user/user.service";
import { ShipmentEntity } from "src/shipment/shipment.entity";
import { OrderProductEntity } from "src/order_product/orderProduct.entity";
import {  OrderDirectDto } from "./order.dto";
import { ProductService } from "src/product/product.service";
import { ShipmentService } from "src/shipment/shimpent.service";
import { PaymentService } from "src/payment/payment.service";

export class OrderService {
    constructor(@InjectRepository(OrderEntity)
                private readonly orderRepository:Repository<OrderEntity>,
                @InjectRepository(OrderProductEntity)
                private readonly orderProductRepository:Repository<OrderProductEntity>,
                private readonly cartService:CartService,
                private readonly userService:UserService,
                private readonly productService:ProductService,
                private readonly shipmentService:ShipmentService,
                private readonly paymentService:PaymentService,
                private readonly dataSource:DataSource
) { }

    async createOrderFromCart(userId:string,shipmentId:string,paymentId:string):Promise<any> {

        const querryRunner= this.dataSource.createQueryRunner()
        await querryRunner.connect()
        await querryRunner.startTransaction()
        try {
            const foundCartByUserId = await this.cartService.getCartByUserId(userId)
            if(foundCartByUserId.err===1) return {
                err:1,
                mess:"cart not found"
            }
            const foundShipment = await this.shipmentService.getShipmentById(shipmentId)
            if(foundShipment.err===1) return {
                err:1,
                mess:'shipment not found'
            }
            const foundPayment = await this.paymentService.findOnePaymentById(paymentId)
            if(foundPayment.err===1) return {
                err:1,
                mess:'payment not found'
            }
            let sum =0 
            foundCartByUserId.cart.forEach((cart)=> {
                sum+=Number(cart.quantity)*Number(cart.product.price)
            })

            // crate new order
            const newOrder = new OrderEntity()
            newOrder.user = await this.userService.findOneById(userId)
            newOrder.totalPrice = sum
            newOrder.shipment = foundShipment.shipment
            newOrder.payment = foundPayment.payment
            // create order products
            const orderProducts: OrderProductEntity[] = []
            for (const cartItem of foundCartByUserId.cart) {
                if (cartItem.quantity > cartItem.product.stock) {
                await querryRunner.rollbackTransaction()
                return {
                    err: 1,
                    mess: `quantity must equal or lower ${cartItem.product.stock}`
                }
            }
                const op = new OrderProductEntity()
                op.product = cartItem.product
                op.quantity = cartItem.quantity
                op.price = cartItem.product.price
                op.order = newOrder
                orderProducts.push(op)
            }

            // cập nhật lại stock sản phẩm trong db
            for (const op of orderProducts) {
                op.product.stock = Number(op.product.stock) - Number(op.quantity)
                await querryRunner.manager.save(op.product)
            }
            const savedOrder = await querryRunner.manager.save(newOrder)
            await querryRunner.manager.save(orderProducts)
            await querryRunner.commitTransaction() // commit to insert all to db

            return {
                err:0,
                mess:'create order from cart success',
                order: savedOrder
            }
        } catch (error) {
            await querryRunner.rollbackTransaction()
            throw new Error(error)
        } finally {
            await querryRunner.release()
        }
    }

    async createOrderDirect(userId:string,orderDto:OrderDirectDto): Promise<any> {
     
     const querryRunner = this.dataSource.createQueryRunner()
     await querryRunner.connect()
     await querryRunner.startTransaction()
     try {
        const user = await this.userService.findOneById(userId)
        if (!user) return { err: 1, mess: 'user not found' }

        const newOrder = new OrderEntity()
        newOrder.user = user

        const foundShipment = await this.shipmentService.getShipmentById(orderDto.shipmentId)
        if(foundShipment.err===1) return {
            err:1,
            mess:'shipment not found'
        }
        const foundPayment = await this.paymentService.findOnePaymentById(orderDto.paymentId)
        if(foundPayment.err===1) return {
            err:1,
            mess:'payment not found'
        }
        newOrder.shipment = foundShipment.shimpent
        newOrder.payment = foundPayment.payment
        const orderProducts: OrderProductEntity[] = []
        let total = 0
        for (const item of orderDto.items) {
            const op = new OrderProductEntity()
            const foundProductRes = await this.productService.findOneById(item.productId)
            if (foundProductRes.err === 1) {
                await querryRunner.rollbackTransaction()
                return { err: 1, mess: `product ${item.productId} not found` }
            }
            const foundProduct = foundProductRes.product
            if (item.quantity > foundProduct.product.stock) {
                await querryRunner.rollbackTransaction()
                return { 
                     err: 1, 
                     mess: `quantity must equal or lower ${foundProduct.stock}` 
                }
            }
            op.product = foundProduct
            op.quantity = item.quantity
            op.price =  foundProduct.price 
            op.order = newOrder
            orderProducts.push(op)
            total+=Number(item.quantity)*Number(foundProduct.price)
        }

        // chỉnh sửa stock sản phẩm
        for(const op of orderProducts) {
            op.product.stock = Number(op.product.stock) - Number(op.quantity)
            await querryRunner.manager.save(op.product)
        }
        newOrder.totalPrice = total

        const savedOrder = await querryRunner.manager.save(newOrder)
        await querryRunner.manager.save(orderProducts)
        await querryRunner.commitTransaction()

        return { err: 0, mess: 'create order success', order:savedOrder }
     } catch (error) {
        await querryRunner.rollbackTransaction()
        throw new Error(error)
     } finally {
        await querryRunner.release()
     }
    }

    async getAll():Promise<any> {
        try {
            return await this.orderRepository.find()
        } catch (error) {
            throw new Error(error)
        }
    }

    async getOrderByUserId(userId:string):Promise<any> {
        try {
            return await this.orderRepository.findOne({where:{user:{id:userId}}})
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteOrder(userId:string,orderId:string):Promise<any> {
        try {
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
        } catch (error) {
            throw new Error(error)
        }
    }
}