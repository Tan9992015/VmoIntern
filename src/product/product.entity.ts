import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid'
@Entity('product')
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

    @CreateDateColumn({name: 'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date

    //soft delete
    @DeleteDateColumn({name:'deleted_at'})
    deletedAt:Date
}