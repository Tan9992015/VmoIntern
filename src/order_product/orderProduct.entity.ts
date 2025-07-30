import { Injectable } from "@nestjs/common";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Injectable()
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

}