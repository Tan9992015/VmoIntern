import { OrderEntity } from "src/order/order.entity";
import { ProductEntity } from "src/product/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class OrderProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    quantity:string

    @Column()
    price:Number

    @CreateDateColumn({name:'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date

    @ManyToOne(()=>ProductEntity,product=>product.orderProduct)
    product:ProductEntity

    @ManyToOne(()=>OrderEntity,order=>order.orderProduct)
    order:OrderEntity
}