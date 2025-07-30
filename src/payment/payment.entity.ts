import {  PaymentMethodEnum, PaymentStatusEnum } from "src/enum/payment.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid'
@Entity()
export class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        type:'enum',
        enum:PaymentMethodEnum,
        default:PaymentMethodEnum.OFFLINE
    })
    paymentMethod:PaymentMethodEnum

    @Column({
        type:'enum',
        enum:PaymentStatusEnum,
        default:PaymentStatusEnum.PENDING
    })
    paymentStatus:PaymentStatusEnum

    @Column()
    paymentDate:Date

    @CreateDateColumn({name:'created_at'})
    creatdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date
    
}