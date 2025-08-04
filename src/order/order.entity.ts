import { OrderProductEntity } from 'src/order_product/orderProduct.entity';
import { PaymentEntity } from 'src/payment/payment.entity';
import { ShipmentEntity } from 'src/shipment/shipment.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {v4 as uuidv4} from 'uuid'
@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string 

    @Column()
    totalPrice:Number

    @CreateDateColumn({name:'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date

    @OneToMany(()=>OrderProductEntity,orderProduct=>orderProduct.order)
    orderProduct:OrderProductEntity[]

    @ManyToOne(()=>ShipmentEntity,shipment=>shipment.orders)
    shipment:ShipmentEntity

    @ManyToOne(()=>PaymentEntity,payment=>payment.orders)
    payment:PaymentEntity
}