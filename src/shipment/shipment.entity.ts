import { ShipmmentMethod, ShipmmentStatus } from 'src/enum/shipment.enum';
import { OrderEntity } from 'src/order/order.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {v4 as uuidv4} from 'uuid'
@Entity()
export class ShipmentEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        type:'enum',
        enum:ShipmmentMethod,
        default:ShipmmentMethod.ECONOMY
    })
    shipmentMethod:ShipmmentMethod

    @Column({
        type:'enum',
        enum:ShipmmentStatus,
        default:ShipmmentStatus.PENDING
    })
    shipmentStatus:ShipmmentStatus

    @Column()
    address:string

    @CreateDateColumn({name: 'created_at'})
    createdAt:Date

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date

    @OneToMany(()=>OrderEntity,order=>order.shipment)
    order:OrderEntity[]

    @ManyToOne(()=>UserEntity,user=>user.shipment)
    user:UserEntity
}