import { OrderEntity } from "src/order/order.entity";
import { ProductEntity } from "src/product/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class OrderProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    quantity:Number

    @Column()
    price:Number

    @CreateDateColumn({name:'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date

    @DeleteDateColumn({name:'deleted_at'})
    deletedAt:Date

    @ManyToOne(()=>ProductEntity,product=>product.orderProduct)
    product:ProductEntity

    @ManyToOne(()=>OrderEntity,order=>order.orderProduct)
    order:OrderEntity
}