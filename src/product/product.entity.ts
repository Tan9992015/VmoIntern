import { CartEntity } from "src/cart/cart.entity";
import { CategoryEntity } from "src/category/category.entity";
import { OrderProductEntity } from "src/order_product/orderProduct.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid'
@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string 

    @Column({unique:true})
    name: string

    @Column()
    description:string

    @Column()
    price:Number

    @Column()
    stock:Number

    @Column()
    image:string
    
    @CreateDateColumn({name: 'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date

    //soft delete
    @DeleteDateColumn({name:'deleted_at'})
    deletedAt:Date

    @ManyToOne(()=>CategoryEntity,category=>category.product, {
        nullable:true,
        onDelete:'SET NULL'
    })
    category:CategoryEntity

    @OneToMany(()=>OrderProductEntity,orderProduct=>orderProduct.product)
    orderProduct:OrderProductEntity[]

    @OneToMany(()=>CartEntity,cart=>cart.product)
    cart:CartEntity[]
}