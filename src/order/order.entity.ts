import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {v4 as uuidv4} from 'uuid'
@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string 

    @Column()
    totalPrice:Number

    @CreateDateColumn({name:'created_at'})
    creatdedAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date
}