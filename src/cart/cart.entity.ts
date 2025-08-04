import { ProductEntity } from "src/product/product.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CartEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @ManyToOne(() => UserEntity, user => user.cart)
    user: UserEntity

    @ManyToOne(() => ProductEntity, product => product.cart)
    product: ProductEntity
}