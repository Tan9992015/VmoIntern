import { CartEntity } from "src/cart/cart.entity";
import { Role } from "src/enum/role.enum";
import { PaymentEntity } from "src/payment/payment.entity";
import { ShipmentEntity } from "src/shipment/shipment.entity";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string

    @Column({
        type:'enum',
        enum:Role,
        default:Role.USER
    })
    role:Role

    @Column()
    address:string

    @Column()
    phoneNumber:string

    @Column()
    avatar:string

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase()
    }

    @CreateDateColumn({name:'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date

    @DeleteDateColumn({name:'deleted_at'})
    deletedAt:Date

    @OneToMany(()=>PaymentEntity,payment=>payment.user)
    payment:PaymentEntity[]

    @OneToMany(()=>ShipmentEntity,shipment=>shipment.user)
    shipment:ShipmentEntity[]

    @OneToMany(()=>CartEntity,cart=>cart.user)
    cart:CartEntity[]

}
