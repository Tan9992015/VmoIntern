import { ProductEntity } from "src/product/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid'
@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string 

    @CreateDateColumn({name:'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date

    @DeleteDateColumn({name: 'deleted_at'})
    deletaedAt:Date

    @OneToMany(()=>ProductEntity,product=>product.category)
    product:ProductEntity[]

}