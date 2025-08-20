import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentEntity } from "./payment.entity";
import { Repository } from "typeorm";
import { ShipmentDto } from "src/shipment/shipment.dto";
import { ShipmentEntity } from "src/shipment/shipment.entity";
import { PaymentAllOptional, PaymentDto } from "./payment.dto";
import { UserService } from "src/user/user.service";
import { ppid } from "process";

@Injectable()
export class PaymentService {
    constructor(@InjectRepository(PaymentEntity)
                private readonly paymentRepository:Repository<PaymentEntity>,
                private readonly userService:UserService
) { }

    async create(payment:PaymentDto,userId:string):Promise<any> {
        try {
            const newPayment = new PaymentEntity()
        newPayment.total = payment.total
        newPayment.paymentMethod = payment.paymentMethod
        newPayment.paymentStatus = payment.paymentStatus
        newPayment.paymentDate = new Date()
        const foundUser = await this.userService.findOneById(userId)

        if(!foundUser) return {
            err:1,
            mess:'user not found'
        }

        newPayment.user = foundUser
        await this.paymentRepository.save(newPayment)
        return {
            err:0,
            mess:'create payment success',
            payment:newPayment
        }
        } catch (error) {
          throw new Error(error)   
        }
    }

    async getAllPayment():Promise<any> {
        try {
            return await this.paymentRepository.find({relations:['user']})
        } catch (error) {
            throw new Error(error)
        }
    }

    async findOnePaymentById(id:string):Promise<any> {
        try {
            const foundPayment = await this.paymentRepository.findOne({where:{id},relations:['user']})
            if(!foundPayment) return {
                err:1,
                mess:'payment not exist'
            }  
            return {
                err:0,
                mess:'found payment success',
                payment:foundPayment
            } 
        } catch (error) {
            throw new Error(error)
        }
    }

    async findUserPayment(userId:string):Promise<any> {
        try {
             const foundUser = await this.userService.findOneById(userId)
            if(!foundUser) return {
            err:1,
            mess:'user not found'
            }
            const foundPayment = await this.paymentRepository.find({where:{user:{id:userId}}})
            if(!foundPayment) return {
                err:1,
                mess:'payment from user not found or not exist'
            }
            return {
                err:0,
                mess:'found payment success',
                payment:await foundPayment
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async updatePaymentByUserId(userId:string,paymentId:string,payment:PaymentAllOptional):Promise<any> {
        try {
            const foundUser = await this.userService.findOneById(userId)
            if(!foundUser) return {
                err:1,
                mess:'user not found'
            }
            const foundPayments = await this.paymentRepository.find({where:{user:{id:userId}}})

            let check:boolean = false
            for(const payment of foundPayments){
                if(payment.id===paymentId){
                    check = true
                    break
                }
            }
            if(check===false) return {
                err:1,
                mess:'payment not belong to user'
            }
            await this.paymentRepository.update(paymentId,payment)
            return {
                err:0,
                mess:'update payment success'
            }
        } catch (error) {
          throw new Error(error)  
        }
    }

    async deletePayment(userId:string,paymentId:string):Promise<any> {
        try {
            const foundUser = await this.userService.findOneById(userId)
        if(!foundUser) return {
            err:1,
            mess:'user not found'
        }
        const foundPayments = await this.paymentRepository.find({where:{user:{id:userId}}})

        let check:boolean = false
        for(const payment of foundPayments){
            if(payment.id===paymentId){
                check = true
                break
            }
        }
        if(check===false) return {
            err:1,
            mess:'payment not belong to user'
        }
         await this.paymentRepository.softDelete(paymentId)
         return {
            err:0,
            mess:'delete payment success'
         }
        } catch (error) {
            throw new Error(error)
        }
    }
}